import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../Redux/action";
import ProfileCard from "./Card";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const Dashboard = () => {
  const inputEl = useRef("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const { users } = useSelector((state) => state.data);
  const [searchResult, setSearchResult] = useState([]);
  let history = useHistory();

   useEffect(() => {
    if (users && users) {
      const currentPage = page;
      const current = 10 * (currentPage - 1);
      const lastData = 10 * currentPage;
      if (search !== "") {
        const newUser = users.filter((user) => {
          return Object.values(user)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase());
        });
        console.log(newUser);
        const filteredData = newUser.slice(current, lastData);
        setSearchResult(filteredData);
        const totalPages = Math.ceil(newUser.length / 10);
        setCount(totalPages);
      } else {
        const currentdata = users.slice(current, lastData);
        setSearchResult(currentdata);
        const totalPage = Math.ceil(users.length / 10);
        setCount(totalPage);
      }
    }
  }, [page, users, search]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(loadUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    setSearch(inputEl.current.value);
  };

  
  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/addUser")}
        >
          Add User
        </Button>
      </div>
      <div>
        <input
          ref={inputEl}
          placeholder="Search by any string"
          onChange={(e) => handleSearch(e)}
          value={search}
          type="text"
        />
      </div>
      {searchResult.map((all, i) => (
        <ProfileCard key={i} data={all} />
      ))}
      <Pagination count={count} page={page} onChange={handleChange} />
    </div>
  );
};

export default Dashboard;
