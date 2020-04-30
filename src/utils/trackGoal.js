export default function trackGoal({ id, value = 0, bypassProduction = false }) {
  const isProd = process.env.NODE_ENV === "production"
  if (window.fathom && (isProd || bypassProduction)) {
    return window.fathom("trackGoal", id, value)
  }
}
