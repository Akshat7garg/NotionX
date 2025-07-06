import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeDialog, openDialog } from '@/store/slices/dialogSlice';
import LogIn from './LogIn';
import Register from './Register';
import ChangePassword from './ChangePassword';

function AuthOptions() {
    const dispatch = useDispatch();

    // Get dialog states from Redux
    const {
        login: loginOpen,
        register: registerOpen,
        changePassword: changePasswordOpen
    } = useSelector((state) => state.dialogs);

    const activeDialog = loginOpen
        ? 'login'
        : registerOpen
            ? 'register'
            : changePasswordOpen
                ? 'changePassword'
                : null;

    // Close whichever dialog is open
    const handleCloseDialog = () => {
        if (activeDialog) {
            dispatch(closeDialog(activeDialog));
        }
    }

    return (
        <div>

            {/* Sign-in button */}
            <button
                className='py-1.5 px-6 border-4 rounded-xl border-mountain-2 bg-cream-6 font-bold text-cream-1 text-lg cursor-pointer'
                onClick={() => dispatch(openDialog('login'))}
            >
                Sign in
            </button>

            {/* Blurred backdrop when a dialog is open */}
            {(loginOpen || registerOpen || changePasswordOpen) && (
                <div
                    className='fixed z-10 inset-0 blur-bg backdrop-blur-xs bg-mountain-1/47'
                    onClick={handleCloseDialog}
                />
            )}

            {/* Dialog modals */}
            {loginOpen && <LogIn />}
            {registerOpen && <Register />}
            {changePasswordOpen && <ChangePassword />}
        </div>
    )
}

export default AuthOptions