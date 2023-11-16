import React, { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Dashboards from '~/components/molecules/Dashboard'
import { ROUTES } from '~/routes';
import { RootState, useAppSelector } from "~/store";
import { UserRole } from "~/utils/constant";
const Dashboard = () => {
  const navigate = useNavigate();
  const userData = useAppSelector(
    (state: RootState) => state.userInfo.userData
  );

  useLayoutEffect(() => {
    if (userData) {
      if (userData?.role !== UserRole.Admin){
        navigate(ROUTES.Unauthorize)
      }
    }
  }, [userData])
  return (
    <div className='overflow-y-auto overflow-x-hidden max-h-[90vh]'>
      <Dashboards/>
    </div>
  )
}

export default Dashboard