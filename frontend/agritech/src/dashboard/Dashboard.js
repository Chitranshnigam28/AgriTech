import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap'; 
const Dashboard = () => {
  const token = localStorage.getItem("token")
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()

  console.log(users)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const result = await response.json()
        console.log(result);  // Log the result to see what is returned

        if (Array.isArray(result)) {
          setUsers(result);
        } else {
          console.error('Expected an array of users, got:', result);
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    if (token) {
      fetchUsers();
    } else {
      navigate("/login")
    }
  }, [token, navigate])
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className='text-center'>Dashboard</h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr> 
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard

// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Table } from 'react-bootstrap';

// const Dashboard = () => {
//   const token = localStorage.getItem("token");
//   const refreshToken = localStorage.getItem("refreshToken");
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   const refreshAccessToken = async () => {
//     if (!refreshToken) return null;

//     const response = await fetch("http://localhost:5001/auth/refresh-token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ refreshToken })
//     });

//     if (response.ok) {
//       const result = await response.json();
//       localStorage.setItem("token", result.accessToken);
//       return result.accessToken;
//     } else {
//       console.log("Failed to refresh token");
//       return null;
//     }
//   };

//   const fetchUsers = useCallback(async (retryCount = 0) => {
//     try {
//       const response = await fetch("http://localhost:5001/api/users", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
  
//       if (response.ok) {
//         const result = await response.json();
//         if (Array.isArray(result)) {
//           setUsers(result);
//         } else {
//           console.error('Expected an array of users, got:', result);
//         }
//       } else if (response.status === 403) {
//         if (retryCount < 1) {
//           const newToken = await refreshAccessToken();
//           if (newToken) {
//             return fetchUsers(retryCount + 1);
//           }
//         }
//         console.error("Access denied. Navigating to login.");
//         navigate("/login");
//       }
//     } catch (error) {
//       console.log("Error fetching users:", error.message);
//     }
//   }, [navigate, token]);
  
  

//   useEffect(() => {
//     if (token) {
//       fetchUsers();
//     } else {
//       navigate("/login");
//     }
//   }, [token, navigate, fetchUsers]);

//   return (
//     <Container className="mt-5">
//       <Row>
//         <Col>
//           <h1 className='text-center'>Dashboard</h1>
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user.id}>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;

