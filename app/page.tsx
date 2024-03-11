"use client";

import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
      <div style={{ maxWidth: '500px', margin: '100px auto', backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const Page = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://randomuser.me/api/?results=3');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setUserData(data.results);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (userData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      {userData.map((user: any, index: number) => (
        <div key={index} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer', marginBottom: '20px', paddingTop: '20px', borderBottom: '1px solid #eee', paddingLeft: '20px' }}> 
          <h2 style={{ fontSize: '24px' }}>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
          <img src={user.picture.large} alt="User" />
          <p>{user.email}</p>
          <p>Location: {`${user.location.city}, ${user.location.country}`}</p>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedUser && (
          <div>
            <h2 style={{ fontSize: '24px' }}>{`${selectedUser.name?.title} ${selectedUser.name?.first} ${selectedUser.name?.last}`}</h2>
            <img src={selectedUser.picture?.large} alt="User" />
            <p>Email: {selectedUser.email}</p>
            <p>Phone: {selectedUser.phone}</p>
            {selectedUser.location && (
              <p>Location: {`${selectedUser.location.city}, ${selectedUser.location.state}, ${selectedUser.location.country}`}</p>
            )}
          </div>
        )}
      </Modal>
    </main>
  );
};

export default Page;
