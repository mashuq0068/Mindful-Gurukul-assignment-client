import { Link, useNavigate } from "react-router-dom";
import UseUsers from "../../Hooks/UseUsers";

import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import UseAxiosDefault from "../../Hooks/UseAxiosDefault";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";




const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const [searchTerm, setSearchTerm] = useState("");
    const { users, refetch } = UseUsers()
    const [isFiltered, setIsFiltered] = useState(localStorage.getItem("isFiltered" || false))
    const [data, setData] = useState([])
    const [sortBy, setSortBy] = useState(localStorage.getItem("sortBy") || null);
    const navigate = useNavigate()
    const axiosDefault = UseAxiosDefault()
    console.log(users)

  
    
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

    const handleSearch = async (e) => {
        setSearchTerm(e.target.value);
    };
    const handleFilter = (e) => {
        setIsFiltered(true)
        setSortBy(e.target.value)
        localStorage.setItem("sortBy", e.target.value);
        localStorage.setItem("isFiltered", true);

    }
    const handleDetails = (id) => {

        navigate(`/details/${id}`)

    }
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
            {/* add user */}
            <div>
                <Link to='/addUser' className="fixed z-20 text-xl 2xl:text-2xl bottom-4 right-[45vw] lg:bottom-12 lg:right-24 bg-[#e456d1] px-4 py-2 w-max h-max rounded-[50%] shadow-lg drop-shadow-xl hover:bg-[#be3cad] text-black shadow-black   focus:ring focus:border-blue-300">
                    +

                </Link>
            </div>
            {/* filter and search */}
            <div className="flex justify-between flex-col lg:p-0 p-4 md:flex-row-reverse lg:w-[80vw] mx-auto items-center">
                <div>
                    <select  value={sortBy && sortBy} onChange={handleFilter} name="filter">
                        <option value="">Filtered By</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="Last Modified">Last Modified</option>
                        <option value="Last Inserted">Last Inserted</option>
                    </select>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search by name, mobile, or email"
                        className="px-4 py-2 lg:w-[30vw] lg:mt-0 mt-7 w-[90vw] md:w-[50vw] "
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            {/* User lists */}
            <div>
                {(isFiltered ? data : users)?.length !== 0 ? <div className="overflow-x-auto">
                    <table className="table lg:w-[80vw] mx-auto mt-[10vh]">

                        <thead className="bg-[#df4fcc] font-bold">
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
                    <div>
                        {/* <img className="fixed top-[40vh] left-[40vw]" src="https://bsmedia.business-standard.com/_media/bs/theme/faq_view_all/images/no-result-found.png" alt="" /> */}
                        <img className="lg:fixed lg:mt-0 mt-[15vh] mx-auto md:w-[300px] lg:w-[600px] top-[30vh] left-[30vw]" src="https://vectorified.com/images/no-data-icon-16.png" alt="No data found" />
                    </div>

                }
            </div>
        </div>
    );
};

export default Dashboard;