export function World() {
  return (
    <>
      <mesh castShadow position-y={0.5}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh receiveShadow scale={[5, 0.1, 5]}>
        <boxGeometry />
        <meshStandardMaterial color="limegreen" />
      </mesh>
    </>
  )
}
