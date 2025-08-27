import {useEffect, useRef, useState} from "react";
import {Outlet, useNavigate, useSearchParams} from "react-router";
import {UserFilter, useUserStore} from "~/stores/user_store";
import {CardGrid, UserCard} from "~/components/card";
import {Table, TableCell, TableHeader, TableRow} from "~/components/table";

export default function UsersPage() {
    const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
    const [scrollMode, setScrollMode] = useState<'pagination' | 'infinite-scroll'>('pagination');

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const totalPages = Math.ceil(useUserStore.getState().filteredUsers.length / ITEMS_PER_PAGE);

    const [visibleUsersCount, setVisibleUsersCount] = useState(ITEMS_PER_PAGE);
    const containerRef = useRef<HTMLDivElement>(null);

    const {filteredUsers, fetchUsers, applyFilter, loading} = useUserStore();

    const [searchParams] = useSearchParams();

    useEffect(() => {
        fetchUsers().then(() => {
            const name = searchParams.get('name') || '';
            const email = searchParams.get('email') || '';
            const role = searchParams.get('role') || '';
            let active: boolean | null = null;
            if (searchParams.get('active') === 'true') {
                active = true;
            } else if (searchParams.get('active') === 'false') {
                active = false;
            }

            const filter = new UserFilter(name, email, role, active);
            applyFilter(filter);
        });
    }, [fetchUsers, applyFilter, searchParams]);

    useEffect(() => {
        if (scrollMode === 'infinite-scroll') {
            const handleScroll = () => {
                if (containerRef.current) {
                    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                    if (scrollTop + clientHeight >= scrollHeight - 100) {
                        if (visibleUsersCount < filteredUsers.length) {
                            setVisibleUsersCount(prevCount => Math.min(prevCount + ITEMS_PER_PAGE, filteredUsers.length));
                        }
                    }
                }
            };

            const container = containerRef.current;
            if (container) {
                container.addEventListener('scroll', handleScroll, { passive: true });
            }

            return () => {
                if (container) {
                    container.removeEventListener('scroll', handleScroll);
                }
            };
        }
    }, [scrollMode, filteredUsers.length]);

    const getUsersToDisplay = () => {
        if (scrollMode === 'pagination') {
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            return filteredUsers.slice(startIndex, endIndex);
        } else {
            return filteredUsers.slice(0, visibleUsersCount);
        }
    };

    const displayedUsers = getUsersToDisplay();



    const navigate = useNavigate();

    if (loading) {
        return (
            <>
                <div className="p-6">
                    <h1 className="text-xl font-bold">Loading...</h1>
                </div>
            </>
        );
    }

    if (filteredUsers.length === 0) {
        return (
            <>
                <div className="p-6">
                    <h1 className="text-xl font-bold">No user found</h1>
                </div>

                <button
                    onClick={() => navigate("/users/filter-users")}
                    className="fixed bottom-6 right-48 w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg flex items-center justify-center hover:bg-blue-700"
                >
                    %
                </button>

                <button
                    onClick={() => navigate("/users/add-user")}
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg flex items-center justify-center hover:bg-blue-700"
                >
                    +
                </button>


                <Outlet/>
            </>
        );
    }

    return (
        <>
            <div className="relative p-6">
                <h1 className="text-xl font-bold">Users</h1>
                <div className="flex justify-end gap-2 mb-4">
                    <button
                        onClick={() => {
                            setScrollMode('pagination');
                            setCurrentPage(1);
                            setVisibleUsersCount(ITEMS_PER_PAGE);
                        }}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${
                            scrollMode === 'pagination'
                                ? 'bg-blue-600 text-white shadow'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Pagination
                    </button>
                    <button
                        onClick={() => {
                            setScrollMode('infinite-scroll');
                            setVisibleUsersCount(ITEMS_PER_PAGE);
                            setCurrentPage(1);
                        }}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${
                            scrollMode === 'infinite-scroll'
                                ? 'bg-blue-600 text-white shadow'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Infinite Scroll
                    </button>
                </div>

                <button
                    onClick={() => setViewMode(viewMode === 'card' ? 'table' : 'card')}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {viewMode === 'card' ? 'Table View' : 'Card View'}
                </button>

                <div
                    ref={containerRef}
                    className={`flex-grow overflow-y-auto pr-2 ${scrollMode === 'pagination' ? '' : 'h-[70vh]'}`}
                >
                    {viewMode === 'card' && (
                        <CardGrid>
                            {displayedUsers.map((user, i) => (
                                <UserCard key={user.id || i} onClick={() => navigate(`/users/${user.id || i}`)}>
                                    <h3 style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>{user.name}</h3>
                                    <p>Email: {user.email}</p>
                                    <p>Role: {user.role}</p>
                                    <p>Created: {user.creationDate.toDateString()}</p>
                                    <p>Details</p>
                                </UserCard>
                            ))}
                        </CardGrid>
                    )}

                    {viewMode === 'table' && (
                        <Table>
                            <thead>
                            <tr>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Email</TableHeader>
                                <TableHeader>Role</TableHeader>
                                <TableHeader>Created</TableHeader>
                                <TableHeader>Details</TableHeader>
                            </tr>
                            </thead>
                            <tbody>
                            {displayedUsers.map((user, i) => (
                                <TableRow key={user.id || i} onClick={() => navigate(`/users/${user.id || i}`)}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.creationDate.toDateString()}</TableCell>
                                    <TableCell>Details</TableCell>
                                </TableRow>
                            ))}
                            </tbody>
                        </Table>
                    )}

                    {scrollMode === 'infinite-scroll' && visibleUsersCount < filteredUsers.length && (
                        <div className="flex justify-center items-center py-4">
                            <div className="text-gray-500 text-sm">Loading more users...</div>
                        </div>
                    )}
                </div>

                {scrollMode === 'pagination' && (
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                        >
                            Previous
                        </button>
                        <span className="text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                )}


                <button
                    onClick={() => navigate("/users/filter-users")}
                    className="fixed bottom-6 right-48 w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg flex items-center justify-center hover:bg-blue-700"
                >
                    %
                </button>

                <button
                    onClick={() => navigate("/users/add-user")}
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg flex items-center justify-center hover:bg-blue-700"
                >
                    +
                </button>

                <Outlet/>
            </div>
        </>
    );
}

