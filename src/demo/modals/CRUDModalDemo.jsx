'use client' ;

import { useState, useMemo } from 'react' ;

import useAddModal    from '@/components/modals/hooks/useAddModal' ;
import useEditModal   from '@/components/modals/hooks/useEditModal' ;
import useRemoveModal from '@/components/modals/hooks/useRemoveModal' ;

import Avatar       from '@/components/avatars/Avatar';
import Badge        from '@/components/Badge' ;
import Button       from '@/components/Button' ;
import Container    from '@/display/Container' ;
import Divider      from '@/components/Divider' ;
import ConfirmModal from '@/components/modals/ConfirmModal' ;
import Input        from '@/components/inputs/Input' ;
import Modal        from '@/components/modals/Modal' ;

import { MdAdd, MdEdit, MdDelete, MdPerson, MdWork } from 'react-icons/md' ;

const CRUDDemo = () =>
{
    const [ users, setUsers ] = useState([
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0101', role: 'Developer' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '555-0102', role: 'Designer' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-0103', role: 'Manager' },
        { id: 4, name: 'Diana Prince', email: 'diana@example.com', phone: '555-0104', role: 'Developer' },
    ]) ;

    const sortedUsers = useMemo(() =>
    {
        return [ ...users ].sort(( a, b ) => a.name.localeCompare( b.name )) ;
    }, [ users ]) ;

    // ==================== ADD MODAL ====================
    const addModal = useAddModal({
        init: () => ({
            id: 0,
            name: '',
            email: '',
            phone: '',
            role: 'Developer',
        }),
        onAdd: ( newUser ) =>
        {
            const userWithId = {
                ...newUser,
                id: Date.now(),
            } ;
            console.log( 'Adding user:', userWithId ) ;
            setUsers([ ...users, userWithId ]) ;
        },
    }) ;

    // ==================== EDIT MODAL ====================
    const editModal = useEditModal({
        onEdit: ( updatedUser, originalUser ) =>
        {
            console.log( 'Updating user:', updatedUser ) ;
            console.log( 'Original was:', originalUser ) ;
            setUsers( users.map( u => u.id === updatedUser.id ? updatedUser : u )) ;
        },
    }) ;

    // ==================== REMOVE MODAL ====================
    const removeModal = useRemoveModal({
        onRemove: ( user ) =>
        {
            console.log( 'Deleting user:', user ) ;
            setUsers( users.filter( u => u.id !== user.id )) ;
        },
    }) ;

    // Validation
    const isAddValid = addModal.item?.name && addModal.item?.email ;
    const isEditValid = editModal.item?.name && editModal.item?.email ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">CRUD Hooks Demo</h2>
                    <p className="text-base-content/70 mt-2">
                        useAddModal, useEditModal, useRemoveModal
                    </p>
                </div>
                <Button
                    color="primary"
                    onClick={ addModal.openAdd }
                    className="gap-2"
                >
                    <MdAdd size={20} />
                    Add User
                </Button>
            </div>

            <Divider />

            {/* Stats */}
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <MdPerson size={40} />
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value text-primary">{ users.length }</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <MdWork size={40} />
                    </div>
                    <div className="stat-title">Developers</div>
                    <div className="stat-value text-secondary">
                        { users.filter( u => u.role === 'Developer' ).length }
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-accent">
                        <MdEdit size={40} />
                    </div>
                    <div className="stat-title">Designers</div>
                    <div className="stat-value text-accent">
                        { users.filter( u => u.role === 'Designer' ).length }
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* ✅ Utilise sortedUsers au lieu de users */}
                                { sortedUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 text-base-content/50">
                                            No users yet. Click "Add User" to get started!
                                        </td>
                                    </tr>
                                ) : (
                                    sortedUsers.map( user => (
                                        <tr key={ user.id } className="hover">
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        innerClassName="bg-base-200 text-base-200-content rounded-full w-10"
                                                        placeholder
                                                        size={ 40 }
                                                    >
                                                        <span className="text-lg">
                                                            { user.name.split(' ').map( n => n[0] ).join('') }
                                                        </span>
                                                    </Avatar>
                                                    <div className="font-bold">{ user.name }</div>
                                                </div>
                                            </td>
                                            <td>{ user.email }</td>
                                            <td>{ user.phone }</td>
                                            <td>
                                                <Badge
                                                    color={
                                                        user.role === 'Developer' ? 'primary' :
                                                        user.role === 'Designer' ? 'secondary' :
                                                        'accent'
                                                    }
                                                >
                                                    { user.role }
                                                </Badge>
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        color="info"
                                                        onClick={() => editModal.openEdit( user )}
                                                        className="gap-1"
                                                    >
                                                        <MdEdit size={16} />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        color="error"
                                                        onClick={() => removeModal.openRemove( user )}
                                                        className="gap-1"
                                                    >
                                                        <MdDelete size={16} />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Hook States */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Add Modal State */}
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h3 className="card-title text-sm">useAddModal State</h3>
                        <div className="text-xs space-y-1 font-mono">
                            <div>valid: { isAddValid ? '✓' : '✗' }</div>
                        </div>
                    </div>
                </div>

                {/* Edit Modal State */}
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h3 className="card-title text-sm">useEditModal State</h3>
                        <div className="text-xs space-y-1 font-mono">
                            <div>hasChanges: { editModal.hasChanges ? '✓' : '✗' }</div>
                            <div>valid: { isEditValid ? '✓' : '✗' }</div>
                        </div>
                    </div>
                </div>

                {/* Remove Modal State */}
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h3 className="card-title text-sm">useRemoveModal State</h3>
                        <div className="text-xs space-y-1 font-mono">
                            <div>ready: ✓</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==================== ADD MODAL ==================== */}
            <Modal
                ref={ addModal.modalRef }
                title="Add New User"
                icon={ <MdAdd size={30} className="text-primary" /> }
                agree="Add User"
                agreeColor="primary"
                agreeIcon={ <MdAdd size={20} /> }
                agreeDisabled={ !isAddValid }
                onAgree={ addModal.handleAdd }
                maxWidth="max-w-md"
            >
                <div className="flex flex-col gap-4 py-4">
                    <Input
                        label="Name"
                        placeholder="Enter full name"
                        value={ addModal.item?.name || '' }
                        onChange={ (value) => addModal.setItem({ ...addModal.item, name: value }) }
                        error={ !addModal.item?.name ? 'Name is required' : '' }
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="user@example.com"
                        value={ addModal.item?.email || '' }
                        onChange={ (value) => addModal.setItem({ ...addModal.item, email: value }) }
                        error={ !addModal.item?.email ? 'Email is required' : '' }
                    />

                    <Input
                        label="Phone"
                        placeholder="555-0100"
                        value={ addModal.item?.phone || '' }
                        onChange={ (value) => addModal.setItem({ ...addModal.item, phone: value }) }
                    />

                    {/* Role Select - DaisyUI 5 */}
                    <div className="flex flex-col gap-1">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <select
                            className="select select-primary w-full"
                            value={ addModal.item?.role || 'Developer' }
                            onChange={ (e) => addModal.setItem({ ...addModal.item, role: e.target.value }) }
                        >
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>
                </div>
            </Modal>

            {/* ==================== EDIT MODAL ==================== */}
            <Modal
                ref={ editModal.modalRef }
                title="Edit User"
                icon={ <MdEdit size={30} className="text-info" /> }
                agree="Save Changes"
                agreeColor="info"
                agreeIcon={ <MdEdit size={20} /> }
                agreeDisabled={ !editModal.hasChanges || !isEditValid }
                onAgree={ editModal.handleEdit }
                footerOptions={
                    <Button
                        size="sm"
                        color="ghost"
                        onClick={ editModal.reset }
                        disabled={ !editModal.hasChanges }
                    >
                        Reset
                    </Button>
                }
                maxWidth="max-w-md"
            >
                <div className="flex flex-col gap-4 py-4">
                    { editModal.hasChanges && (
                        <div className="alert alert-warning">
                            <span className="text-sm">You have unsaved changes</span>
                        </div>
                    )}

                    <Input
                        label="Name"
                        placeholder="Enter full name"
                        value={ editModal.item?.name || '' }
                        onChange={ (value) => editModal.setItem({ ...editModal.item, name: value }) }
                        error={ !editModal.item?.name ? 'Name is required' : '' }
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="user@example.com"
                        value={ editModal.item?.email || '' }
                        onChange={ (value) => editModal.setItem({ ...editModal.item, email: value }) }
                        error={ !editModal.item?.email ? 'Email is required' : '' }
                    />

                    <Input
                        label="Phone"
                        placeholder="555-0100"
                        value={ editModal.item?.phone || '' }
                        onChange={ (value) => editModal.setItem({ ...editModal.item, phone: value }) }
                    />

                    {/* Role Select - DaisyUI 5 */}
                    <div className="flex flex-col gap-1">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <select
                            className="select select-info w-full"
                            value={ editModal.item?.role || 'Developer' }
                            onChange={ (e) => editModal.setItem({ ...editModal.item, role: e.target.value }) }
                        >
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>
                </div>
            </Modal>

            {/* ==================== REMOVE MODAL ==================== */}
            <ConfirmModal
                ref={ removeModal.modalRef }
                title="Delete User"
                icon={ <MdDelete size={40} className="text-error" /> }
                agree="Delete"
                agreeIcon={ <MdDelete size={20} /> }
                onAgree={ removeModal.handleRemove }
            >
                <div className="py-4 space-y-4">
                    <p>
                        Are you sure you want to delete <strong>{ removeModal.item?.name }</strong>?
                    </p>

                    { removeModal.item && (
                        <div className="card bg-base-200">
                            <div className="card-body p-4">
                                <div className="flex items-center gap-3">

                                    <Avatar
                                        innerClassName="bg-base-300 text-base-300-content rounded-full w-10"
                                        placeholder
                                        size={ 40 }
                                    >
                                        <span className="text-lg">
                                            { removeModal.item.name.split(' ').map( n => n[0] ).join('') }
                                        </span>
                                    </Avatar>

                                    <div>
                                        <div className="font-bold">{ removeModal.item.name }</div>
                                        <div className="text-sm opacity-70">{ removeModal.item.email }</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="alert alert-warning">
                        <MdDelete />
                        <span>This action cannot be undone.</span>
                    </div>
                </div>
            </ConfirmModal>

        </Container>
    ) ;
} ;

export default CRUDDemo ;