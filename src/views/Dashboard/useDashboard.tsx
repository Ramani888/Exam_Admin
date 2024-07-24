import { useEffect, useState } from "react"
import { serverGetDashboardData } from "../../services/serverApi"

const useDashboard = () => {
    const [dashboardData, setDashboardData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

    const getDashboardData = async () => {
        try {
            setLoading(true)
            const res = await serverGetDashboardData();
            setDashboardData(res?.data)
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    useEffect(() => {
        getDashboardData()
    }, [])

    return {
        dashboardData,
        loading
    }
}

export default useDashboard