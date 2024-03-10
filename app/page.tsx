"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 

const Page = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://randomuser.me/api');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setUserData(data.results[0]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>{`${userData.name.title} ${userData.name.first} ${userData.name.last}`}</CardTitle>
          <CardDescription>{userData.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <img src={userData.picture.large} alt="User" />
        </CardContent>
        <CardFooter>
          <p>Location: {`${userData.location.city}, ${userData.location.country}`}</p>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Page;
