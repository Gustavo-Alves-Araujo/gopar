'use client'
import { useEffect, useRef } from 'react'

declare global {
  interface Window { THREE: any }
}

const Globe = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function startGlobe() {
      const T = window.THREE
      if (!T || !container) return
      container.querySelectorAll('canvas').forEach(c => c.remove())

      if (container.clientWidth === 0) {
        requestAnimationFrame(startGlobe)
        return
      }

      const R = 1
      const W = container.clientWidth
      const H = container.clientHeight

      const scene = new T.Scene()
      const camera = new T.PerspectiveCamera(45, W / H, 0.1, 1000)
      camera.position.z = 2.8

      const renderer = new T.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(renderer.domElement)

      const globeGroup = new T.Group()
      scene.add(globeGroup)

      // Lighting
      scene.add(new T.AmbientLight(0xffffff, 0.3))
      const sun = new T.DirectionalLight(0xffffff, 1.0)
      sun.position.set(5, 3, 5)
      scene.add(sun)

      // lat/lon → Vector3
      function ll(lat: number, lon: number, r: number) {
        const phi = (90 - lat) * Math.PI / 180
        const theta = -lon * Math.PI / 180
        return new T.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        )
      }

      // Gold atmosphere
      globeGroup.add(new T.Mesh(
        new T.SphereGeometry(R * 1.09, 64, 64),
        new T.ShaderMaterial({
          vertexShader: `varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
          fragmentShader: `varying vec3 vN;void main(){float i=pow(0.6-dot(vN,vec3(0,0,1)),3.5);gl_FragColor=vec4(0.788,0.635,0.153,1.0)*i;}`,
          blending: T.AdditiveBlending,
          side: T.BackSide,
          transparent: true,
        })
      ))

      // ── Market hubs [lat, lon] ──────────────────────────────────────────
      const BR   = [-23.55, -46.63] // São Paulo (Brazil HQ)
      const CN   = [31.23, 121.47]  // Shanghai
      const ME   = [25.20, 55.27]   // Dubai
      const EU   = [51.51, -0.13]   // London
      const AF   = [6.45, 3.39]     // Lagos
      const NY   = [40.71, -74.01]  // New York (bonus connection)

      // ── Arcs: [from, to, opacity] ───────────────────────────────────────
      const ARC_DEFS: [number[], number[], number][] = [
        [BR, CN, 0.55], [BR, ME, 0.55], [BR, EU, 0.55], [BR, AF, 0.55], [BR, NY, 0.40],
        [EU, CN, 0.30], [ME, CN, 0.30], [EU, AF, 0.30], [ME, EU, 0.30],
      ]

      // Build arc geometry and collect curve + particle state
      const arcData: { curve: any; pts: any[]; particles: { t: number; speed: number }[] }[] = []

      function addArc(p1: number[], p2: number[], opacity: number) {
        const s = ll(p1[0], p1[1], R).multiplyScalar(1.01)
        const e = ll(p2[0], p2[1], R).multiplyScalar(1.01)
        const dist = ll(p1[0], p1[1], R).distanceTo(ll(p2[0], p2[1], R))
        const ctrl = s.clone().add(e).normalize().multiplyScalar(R + dist * 0.52)
        const curve = new T.QuadraticBezierCurve3(s, ctrl, e)
        const pts = curve.getPoints(80)
        const geo = new T.BufferGeometry().setFromPoints(pts)
        const mat = new T.LineBasicMaterial({ color: 0xC9A227, transparent: true, opacity })
        globeGroup.add(new T.Line(geo, mat))
        arcData.push({
          curve,
          pts,
          particles: [
            { t: Math.random(), speed: 0.0018 + Math.random() * 0.001 },
            { t: (Math.random() + 0.45) % 1, speed: 0.0012 + Math.random() * 0.001 },
          ],
        })
      }

      ARC_DEFS.forEach(([a, b, op]) => addArc(a, b, op))

      // ── Particle system (dots traveling along arcs) ─────────────────────
      const pCount = arcData.reduce((n, a) => n + a.particles.length, 0)
      const pPos = new Float32Array(pCount * 3)
      const pColors = new Float32Array(pCount * 3)
      // Alternate gold / white for variety
      for (let i = 0; i < pCount; i++) {
        const isGold = i % 2 === 0
        pColors[i * 3]     = isGold ? 0.98 : 1.0
        pColors[i * 3 + 1] = isGold ? 0.82 : 1.0
        pColors[i * 3 + 2] = isGold ? 0.15 : 1.0
      }
      const pGeo = new T.BufferGeometry()
      pGeo.setAttribute('position', new T.BufferAttribute(pPos, 3))
      pGeo.setAttribute('color', new T.BufferAttribute(pColors, 3))
      const pMat = new T.PointsMaterial({
        size: 0.045, vertexColors: true, transparent: true, opacity: 1.0, sizeAttenuation: true,
      })
      const particles = new T.Points(pGeo, pMat)
      globeGroup.add(particles)

      // ── Hub markers (small sphere + halo) ──────────────────────────────
      let brazilHalo: any = null
      let pulseT = 0

      function addHub(lat: number, lon: number, isMain: boolean) {
        const pos = ll(lat, lon, R * 1.016)
        const core = new T.Mesh(
          new T.SphereGeometry(isMain ? 0.024 : 0.016, 10, 10),
          new T.MeshBasicMaterial({ color: 0xC9A227, transparent: true, opacity: 1.0 })
        )
        core.position.copy(pos)
        globeGroup.add(core)

        const halo = new T.Mesh(
          new T.SphereGeometry(isMain ? 0.052 : 0.036, 10, 10),
          new T.MeshBasicMaterial({ color: 0xC9A227, transparent: true, opacity: 0.20 })
        )
        halo.position.copy(pos)
        globeGroup.add(halo)
        if (isMain) brazilHalo = halo
      }

      // Load Earth texture
      const loader = new T.TextureLoader()
      loader.setCrossOrigin('anonymous')

      function addHubs() {
        addHub(BR[0], BR[1], true)
        addHub(CN[0], CN[1], false)
        addHub(ME[0], ME[1], false)
        addHub(EU[0], EU[1], false)
        addHub(AF[0], AF[1], false)
        addHub(NY[0], NY[1], false)
      }

      loader.load(
        'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
        (texture: any) => {
          globeGroup.add(new T.Mesh(
            new T.SphereGeometry(R, 64, 64),
            new T.MeshPhongMaterial({
              map: texture, specular: new T.Color(0x111122), shininess: 10,
              color: new T.Color(0.68, 0.68, 0.68),
            })
          ))
          addHubs()
        },
        undefined,
        () => {
          globeGroup.add(new T.Mesh(
            new T.SphereGeometry(R, 64, 64),
            new T.MeshPhongMaterial({ color: 0x0a1628, emissive: 0x050c18 })
          ))
          addHubs()
        }
      )

      // ── Drag interaction ────────────────────────────────────────────────
      let isDragging = false
      let prev = { x: 0, y: 0 }
      let vel = { x: 0, y: 0 }
      const AUTO = 0.0015

      const onMD = (e: MouseEvent) => { isDragging = true; prev = { x: e.clientX, y: e.clientY }; vel = { x: 0, y: 0 } }
      const onMU = () => { isDragging = false }
      const onMM = (e: MouseEvent) => {
        if (!isDragging) return
        vel.x = (e.clientY - prev.y) * 0.005
        vel.y = (e.clientX - prev.x) * 0.005
        globeGroup.rotation.x += vel.x
        globeGroup.rotation.y += vel.y
        prev = { x: e.clientX, y: e.clientY }
      }
      const onTS = (e: TouchEvent) => { isDragging = true; prev = { x: e.touches[0].clientX, y: e.touches[0].clientY }; vel = { x: 0, y: 0 } }
      const onTE = () => { isDragging = false }
      const onTM = (e: TouchEvent) => {
        if (!isDragging) return
        vel.x = (e.touches[0].clientY - prev.y) * 0.005
        vel.y = (e.touches[0].clientX - prev.x) * 0.005
        globeGroup.rotation.x += vel.x
        globeGroup.rotation.y += vel.y
        prev = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }

      renderer.domElement.addEventListener('mousedown', onMD)
      window.addEventListener('mouseup', onMU)
      window.addEventListener('mousemove', onMM)
      renderer.domElement.addEventListener('touchstart', onTS, { passive: true })
      window.addEventListener('touchend', onTE)
      window.addEventListener('touchmove', onTM, { passive: true })

      // ── Animation loop ──────────────────────────────────────────────────
      let rafId: number | null = null
      let running = false
      let visObs: IntersectionObserver | null = null

      function animate() {
        if (!running) return
        rafId = requestAnimationFrame(animate)

        if (!isDragging) {
          vel.x *= 0.90
          vel.y *= 0.90
          globeGroup.rotation.y -= AUTO
        }
        globeGroup.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, globeGroup.rotation.x))

        // Update particles
        let idx = 0
        arcData.forEach(({ curve, particles: ps }) => {
          ps.forEach(p => {
            p.t = (p.t + p.speed) % 1
            const pos = curve.getPoint(p.t)
            pPos[idx * 3] = pos.x; pPos[idx * 3 + 1] = pos.y; pPos[idx * 3 + 2] = pos.z
            idx++
          })
        })
        pGeo.attributes.position.needsUpdate = true

        // Pulse Brazil halo
        pulseT += 0.025
        if (brazilHalo) {
          const s = 1 + 0.35 * Math.abs(Math.sin(pulseT))
          brazilHalo.scale.setScalar(s)
          brazilHalo.material.opacity = 0.22 - 0.12 * Math.abs(Math.sin(pulseT))
        }

        renderer.render(scene, camera)
      }

      if ('IntersectionObserver' in window) {
        visObs = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            if (!running) { running = true; animate() }
          } else {
            running = false
            if (rafId) { cancelAnimationFrame(rafId); rafId = null }
          }
        }, { threshold: 0.01 })
        visObs.observe(container)
      } else {
        running = true; animate()
      }

      const onResize = () => {
        if (!container) return
        camera.aspect = container.clientWidth / container.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(container.clientWidth, container.clientHeight)
      }
      window.addEventListener('resize', onResize)

      cleanupRef.current = () => {
        running = false
        if (rafId) cancelAnimationFrame(rafId)
        if (visObs) visObs.disconnect()
        renderer.domElement.removeEventListener('mousedown', onMD)
        window.removeEventListener('mouseup', onMU)
        window.removeEventListener('mousemove', onMM)
        renderer.domElement.removeEventListener('touchstart', onTS)
        window.removeEventListener('touchend', onTE)
        window.removeEventListener('touchmove', onTM)
        window.removeEventListener('resize', onResize)
        try { renderer.dispose() } catch (_) {}
        container.querySelectorAll('canvas').forEach(c => c.remove())
      }
    }

    if (window.THREE) {
      startGlobe()
    } else {
      const s = document.createElement('script')
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
      s.onload = startGlobe
      document.body.appendChild(s)
    }

    return () => { if (cleanupRef.current) cleanupRef.current() }
  }, [])

  return <div ref={containerRef} className="about-globe-wrapper" />
}

export default Globe
