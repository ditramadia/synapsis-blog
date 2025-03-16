import { RootState } from "@/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const useAuthRedirect = () => {
  const router = useRouter()
  const token = useSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    if (token !== process.env.NEXT_PUBLIC_API_KEY) {
      router.push('/sign-in')
    }
  }, [token, router])
}

export default useAuthRedirect