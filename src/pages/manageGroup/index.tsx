import React, { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ManageGroups from '~/components/molecules/ManageGroups'
import { ROUTES } from '~/routes';
import { RootState, useAppSelector } from "~/store";
import { UserRole } from "~/utils/constant";
const ManageGroup = () => {
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
    <ManageGroups/>
  )
}

export default ManageGroup