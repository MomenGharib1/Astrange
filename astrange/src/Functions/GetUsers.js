import * as Api from "../components/Api";
import { useState, useEffect } from "react";

export function GetUsers() {
  const [persons, setPersons] = useState([
    {
      id: "",
      userName: "",
      email: "",
      password: "",
    },
  ]);
  useEffect(() => {
    const getUsers = async () => {
      const list = await Api.getUsers();
      setPersons(list);
    };
    getUsers();
  }, []);
  return persons;
}
