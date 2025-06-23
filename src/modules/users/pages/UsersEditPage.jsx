import { useEffect } from 'react';
import { UsersForm } from '../components/UsersForm'
import useUsersStore from '../store/useUsersStore'
import { api } from '../../../shared/api/apiClient';
import { notifyService } from '../../core/services/notifyService';
import { ToastContainer } from 'react-toastify';

export const UsersEditPage = ({ userId }) => {

    console.log(userId);


    const fetchUser = useUsersStore(state => state.fetchUser);
    const userSelected = useUsersStore(state => state.userSelected);


    useEffect(() => {
        fetchUser(userId);
    }, [])


    const putUser = async (data) => {
        try {
            const response = await api.put(`/api/v1/users/${userId}`, data)
            console.log(response);
            if (response.status === 200) notifyService.success(response.data.message)

        } catch (error) {
            console.log(error);
            notifyService.error(error)
        }
    }



    return (
        <div>
            <UsersForm initialState={userSelected} onSubmitData={putUser} />
        </div>
    )
}
