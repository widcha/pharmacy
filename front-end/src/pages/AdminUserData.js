import {Button, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {banUserAction, fetchUserData, getItemLength} from "../redux/actions";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

const AdminUserData = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(window.location.search);
  //Pagination
  const [perPage] = useState(10);
  useEffect(() => {
    dispatch(getItemLength());
    dispatch(fetchUserData(window.location.search));
  }, [dispatch, window.location.search]);

  const {lengths, userInfo} = useSelector((state) => state.admin);

  const [pageCount, setPageCount] = useState(lengths.users / perPage);

  useEffect(() => {
    setPageCount(Math.ceil(lengths.users / perPage));
  }, [perPage]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const addLink = window.location.search.split("=")[3];
    history.push(
      `/users-data?page=${selectedPage + 1}&limit=10&search=${addLink}`
    );
  };

  const [searchWord, setSearch] = useState("");
  const searchBtn = () => {
    if (searchWord !== "") {
      const a = `?page=1&limit=10&search=${searchWord}`;
      history.push(`/users-data${a}`);
      dispatch(fetchUserData(a));
      setSearch("");
    } else {
      const a = "?page=1&limit=10";
      history.push(`/users-data${a}`);
      dispatch(fetchUserData(a));
    }
  };

  const banUser = ({name, id, role}) => {
    if (role === 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can't banned an admin!",
      });
    } else {
      Swal.fire({
        title: `Are you sure to ban ${name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ban this user!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(banUserAction({user_id: id}));
          dispatch(fetchUserData(window.location.search));
          Swal.fire("Banned!", "This user is now banned.", "success");
        }
      });
    }
  };
  const tableUserData = () => {
    return (
      <div class="flex">
        <div class="flex w-full mb-8 overflow-hidden rounded-lg shadow-xs">
          <div class="w-full overflow-x-auto">
            <table class="w-full whitespace-no-wrap">
              <thead>
                <tr class="text-lg font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th class="px-10 py-6">Client</th>
                  <th class="pl-10 px-10 py-6">Verified</th>
                  <th class="px-8 py-6">Status</th>
                  <th class="px-10 py-6">Role</th>
                  <th class="pl-12 px-10 py-6">Ban</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {userInfo
                  ? userInfo.map((val, index) => {
                      return (
                        <tr class="text-gray-700 dark:text-gray-400">
                          <td class="px-10 py-5">
                            <div class="flex items-center text-sm">
                              <div>
                                <p class="font-semibold text-lg">
                                  {val.user_username}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="px-10 py-5">
                            <div class="flex items-center text-sm">
                              <div>
                                <p class="text-xs text-gray-600 dark:text-gray-400">
                                  {val.user_isverified === 1 ? (
                                    <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                      &nbsp;&nbsp;&nbsp; Verified
                                      &nbsp;&nbsp;&nbsp;
                                    </span>
                                  ) : (
                                    <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                                      Not Verified
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="px-10 py-5 text-xs">
                            {val.is_banned === 0 ? (
                              <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                &nbsp;Active&nbsp;
                              </span>
                            ) : (
                              <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                                Banned
                              </span>
                            )}
                          </td>
                          <td class="px-10 py-5">
                            <div class="flex items-center text-sm">
                              <div>
                                <p class="text-lg font-semibold">
                                  {val.user_role_id === 1 ? "Admin" : "User"}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="px-10 py-5 text-xs">
                            <Button
                              style={{
                                outline: 0,
                                backgroundColor: "gray",
                                color: "white",
                              }}
                              disabled={val.is_banned === 1}
                              onClick={() =>
                                banUser({
                                  name: val.user_username,
                                  id: val.user_id,
                                  role: val.user_role_id,
                                })
                              }
                            >
                              Ban
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="mt-4">
      {userInfo.length > 0 ? (
        <div className=" flex justify-center fixed right-10">
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          paddingTop: "57px",
          maxHeight: "50px",
          position: "fixed",
          left: "83%",
        }}
      >
        <div>
          <TextField
            label="Search by Username"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            style={{width: "200px", paddingBottom: "10px"}}
          />
        </div>
        <Button
          onClick={searchBtn}
          style={{backgroundColor: "#2460A7FF", color: "white", outline: 0}}
        >
          Search
        </Button>
      </div>
      <div>
        <Link to="/Dashboard?page1=&limit=10">
          <Button style={{outline: 0}}>Back</Button>
        </Link>
      </div>
      <div className="pl-28 pt-5">{userInfo ? tableUserData() : null}</div>
    </div>
  );
};

export default AdminUserData;
