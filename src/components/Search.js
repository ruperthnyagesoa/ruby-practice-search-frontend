import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../css/Search.css';
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import { BiSearchAlt } from 'react-icons/bi';
import { allLists } from '../redux/list/list';

const Search = () => {
  const dispatch = useDispatch();
  const allListsAction = bindActionCreators(allLists, dispatch);
  const lists = useSelector((state) => state.lists.allLists);
  const loading = useSelector((state) => state.lists.loading);

  useEffect(async () => {
    if (loading) {
      await allListsAction();
    }
  }, []);

  const [searchValue, setSearchValue] = useState('');

  const renderLists = () => {
    const result = [];
    lists.filter((list) => {
      const value = searchValue.replace(/\s/g, '');
      switch (value.length) {
        case 0:
          return list;
        case 1:
          return null;
        case 2:
          if (list.name.length === 2 && list.name.toLowerCase() === value.toLowerCase()) {
            return list;
          }
          return null;
        default:
          if (list.name.toLowerCase()
                 .includes(value.toLowerCase())) {
            return list
          }
    }}).map((list, key) => {
      result.push(
        <tr key={key}>
          <td>{list.name}</td>
        </tr>
      );
    });
    return result;
  };

  return (
    <div className="container-fluid">
      <div className="row m-5">
        <div className="search">
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">< BiSearchAlt /></InputGroup.Text>
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </InputGroup>
          </Form>
        </div>
      </div>
      <div className="row m-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {!loading && renderLists()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Search;
