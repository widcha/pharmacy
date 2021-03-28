import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  changeNotifAdmin,
  fetchNotifAdmin,
  getItemLength,
} from "../redux/actions";
import ReactPaginate from "react-paginate";
import {Link, useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";

const NotificationAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [perPage] = useState(10);
  useEffect(() => {
    dispatch(getItemLength());
    dispatch(fetchNotifAdmin(window.location.search));
  }, [dispatch]);
  const {notif, lengths} = useSelector((state) => state.admin);

  const [pageCount, setPageCount] = useState(lengths.notifall / perPage);
  useEffect(() => {
    setPageCount(lengths.notifall / perPage);
  }, [perPage]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    history.push(`/all-notifications?page=${selectedPage + 1}&limit=10`);
    dispatch(fetchNotifAdmin(`?page=${selectedPage + 1}&limit=10`));
  };

  const toggle = (id) => {
    if (id) {
      dispatch(changeNotifAdmin({id}));
      history.push(`/all-notifications${window.location.search}`);
    }
  };
  const tableNotif = () => {
    return (
      <div class="overflow-x-auto w-full">
        <div class="min-w-screen min-h-screen flex font-sans overflow-hidden">
          <div class="w-full">
            <div class="bg-white shadow-md rounded">
              <table class="min-w-max w-full table-auto">
                <thead>
                  <tr class="text-gray-700 uppercase text-sm leading-normal">
                    <th class="py-3 px-6 text-left">#</th>
                    <th class="py-3 px-6 text-left">Users</th>
                    <th class="py-3 px-6 text-center">Messages</th>
                    <th class="py-3 px-6 text-center">Status</th>
                    <th class="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                  {notif
                    ? notif.map((val, index) => {
                        return (
                          <>
                            {val.admin_notif_status === 1 ? (
                              <tr class="border-b border-gray-200 hover:bg-gray-100">
                                <td class="py-3 px-6 text-left whitespace-nowrap">
                                  <div class="flex items-center">
                                    <p>{index + 1}</p>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-left">
                                  <div class="flex items-center">
                                    <span>
                                      {notif ? val.User.user_username : null}
                                    </span>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-center">
                                  <div class="flex items-center justify-center">
                                    {val.admin_notif_messages}
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-center">
                                  {val.createdAt.split("T")[0]}
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {val.createdAt.split("T")[1].split(".")[0]}
                                </td>
                                <td class="py-3 px-6 text-center">
                                  <div class="flex item-center justify-center">
                                    <div
                                      class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                      onClick={() => toggle(val.admin_notif_id)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              <tr class="border-b text-gray-900 bg-light-blue-100 border-gray-200 hover:bg-gray-100">
                                <td class="py-3 px-6 text-left whitespace-nowrap">
                                  <div class="flex items-center">
                                    <p>{index + 1}</p>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-left">
                                  <div class="flex items-center">
                                    <span>
                                      {notif ? val.User.user_username : null}
                                    </span>
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-center">
                                  <div class="flex items-center justify-center">
                                    {val.admin_notif_messages}
                                  </div>
                                </td>
                                <td class="py-3 px-6 text-center">
                                  {val.createdAt.split("T")[0]}
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {val.createdAt.split("T")[1].split(".")[0]}
                                </td>
                                <td class="py-3 px-6 text-center">
                                  <div class="flex item-center justify-center">
                                    <div
                                      class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                      onClick={() => toggle(val.admin_notif_id)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="pt-5">
      <div>
        <p className="text-xl">All Notifications</p>
        <div>
          <div className="flex-col flex justify-center fixed right-10">
            <div className="flex">
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
            <div className="pl-7">
              <Link to="/all-notifications?page=1&limit=10">
                <Button style={{outline: 0}}>All</Button>
              </Link>
              <Link to="/notifications?page=1&limit=10">
                <Button style={{outline: 0}}>Unread</Button>
              </Link>
            </div>
            <div className="pl-7">
              <Button
                style={{outline: 0}}
                onClick={() => dispatch(changeNotifAdmin({markAll: true}))}
              >
                Mark All As Read
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">{tableNotif()}</div>
    </div>
  );
};

export default NotificationAdmin;
