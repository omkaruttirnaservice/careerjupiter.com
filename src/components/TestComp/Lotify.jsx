import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { memo } from "react"

function Lotify({icon}) {
  return (
    <DotLottieReact
    src={icon}
    loop
    autoplay
  />
  )
}

export default memo(Lotify)
