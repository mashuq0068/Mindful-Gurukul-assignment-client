import { Link, useNavigate } from "react-router-dom";
import UseUsers from "../../Hooks/UseUsers";

import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import UseAxiosDefault from "../../Hooks/UseAxiosDefault";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";





const Dashboard = () => {
    const { user } = useContext(AuthContext)
    // state of searched text
    const [searchTerm, setSearchTerm] = useState("");
    const { users, refetch } = UseUsers()
    // state of filter text
    const [isFiltered, setIsFiltered] = useState(localStorage.getItem("isFiltered" || false))
    // set searched and filtered data to show in ui
    const [data, setData] = useState([])
    // state of sort by text for filter data
    const [sortBy, setSortBy] = useState(localStorage.getItem("sortBy") || null);
    const navigate = useNavigate()
    const axiosDefault = UseAxiosDefault()
    console.log(users)

    // fetching searched data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosDefault.get(`/searchedUsers?searchTerm=${searchTerm}&email=${user?.email}`);
                console.log(response.data);
                setData(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchTerm]);
    // fetching filtered data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosDefault.get(`/filteredUsers?sortBy=${sortBy}&email=${user?.email}`);
                console.log(response.data);

                setData(response.data);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [sortBy]);
    // handle search to set it to searchTerm state
    const handleSearch = async (e) => {
        setSearchTerm(e.target.value);
    };
    // handle filter to set it to sort by state and local storage
    const handleFilter = (e) => {
        setIsFiltered(true)
        setSortBy(e.target.value)
        // set to local storage to record the last filter, that's why even also reload,last filtered data will be shown in UI
        localStorage.setItem("sortBy", e.target.value);
        // set  filtered data status to local storage. If status is true filtered data will be fetched and if status is false by default user data will be fetched
        localStorage.setItem("isFiltered", true);


    }
    // handle  user details
    const handleDetails = (id) => {

        navigate(`/details/${id}`)

    }
    // handle delete user
    const handleDelete = (id) => (e) => {
        e.stopPropagation()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosDefault.delete(`/user/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount > 0) {
                            refetch()
                            const updatedData = (isFiltered ? data : users)?.filter(user => user._id !== id);
                            setData(updatedData);
                            Swal.fire(
                                'Deleted!',
                                'User has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })
    }

    return (
        <div>
            {/* add user button*/}
            <div>
                <Link to='/addUser' className="fixed z-20 text-xl 2xl:text-2xl bottom-4 right-[45vw] lg:bottom-12 lg:right-24 bg-[#e456d1] px-4 py-2 w-max h-max rounded-[50%] shadow-lg drop-shadow-xl hover:bg-[#be3cad] text-black shadow-black   focus:ring focus:border-blue-300">
                    +

                </Link>
            </div>
            {/* filter and search */}
            <div className="flex justify-between flex-col lg:p-0 p-4 md:flex-row-reverse lg:w-[80vw] mx-auto items-center">
                {/* filter */}
                <div className="relative">
                    <select
                        value={sortBy && sortBy}
                        onChange={handleFilter}
                        name="filter"
                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Filtered By</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="Last Modified">Last Modified</option>
                        <option value="Last Inserted">Last Inserted</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M14.293 5.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L10 7.586l3.293-3.293a1 1 0 011.414 0z"
                            />
                        </svg>
                    </div>
                </div>
                {/* search */}
                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder="Search by name, mobile, or email"
                        className="px-4 py-2 lg:w-[30vw] lg:mt-0 mt-7 w-[90vw] md:w-[50vw] border border-gray-300 rounded-l focus:outline-none focus:border-[#e456d1]"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {/* search button */}
                    <button
                        type="button"
                        className="absolute right-0 px-4 md:py-2 bg-[#e456d1] text-white rounded-r bottom-0 lg:top-0 py-3 focus:outline-none hover:bg-[#e456d1]"
                    
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-4.35-4.35M15 10a5 5 0 100-10 5 5 0 000 10z"
                            ></path>
                        </svg>
                    </button>
                </div>

            </div>
            {/* User lists */}
            <div className=" mb-[10vh]">
                {(isFiltered ? data : users)?.length !== 0 ? <div className="overflow-x-auto">
                    <table className="table lg:w-[80vw] mx-auto mt-[10vh]">

                        <thead className="bg-[#df4fcc]  font-bold">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                (isFiltered ? data : users)?.map((user, i) => <tr onClick={() => handleDetails(user?._id)} key={user?._id} className="bg-base-200 cursor-pointer hover:bg-gray-300  duration-500 rounded-lg">
                                    <th>{i + 1}</th>
                                    <td>{user?.userName}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.phone}</td>
                                    <td className=" flex justify-start items-center  "><button onClick={(e) => handleDelete(user?._id)(e)} className="hover:bg-[#bd30aa] btn hover:border-none bg-[#df4fcc]"><RiDeleteBin5Line /></button></td>
                                </tr>)

                            }



                        </tbody>
                    </table>
                </div>
                    :
                    // placeholder image on no data found
                    <div>
                        
                        <img className="lg:fixed lg:mt-0 mt-[15vh] mx-auto md:w-[300px] 2xl:w-[600px] lg:w-[400px] top-[30vh] left-[30vw]" src="https://vectorified.com/images/no-data-icon-16.png" alt="No data found" />
                    </div>

                }
            </div>
        </div>
    );
};

export default Dashboard;