import Navbar from "../components/Navbar";
import "../styles/myHikes.css";
import { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { removeTrailId } from "../utils/localStorage";
import { GET_USER } from "../utils/queries";
import { REMOVE_TRAIL } from "../utils/mutations";

export default function SavedHikes() {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(GET_USER);
  const userData = data?.getUser || {};

  console.log("Here is the userData from GET_USER");
  console.log(userData);

  const [removeTrail, { error }] = useMutation(REMOVE_TRAIL);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteTrail = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    console.log(_id);
    try {
      await removeTrail({
        variables: { _id: _id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div>
      <Navbar />
      <Container className="hikes-container">
        <h2 className="pt-5">
          {userData?.savedTrails?.length
            ? `You've completed ${userData.savedTrails.length} ${
                userData.savedTrails.length === 1 ? "hike" : "hikes"
              }:`
            : "You have no saved hikes!"}
        </h2>
        <Row>
          {userData?.savedTrails?.map((trail) => {
            return (
              <Col key={trail.trailId} md="4">
                <Card border="dark">
                  <Card.Body>
                    <Card.Title>{trail.trailName}</Card.Title>

                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteTrail(trail._id)}
                    >
                      Remove this hike
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

// export default SavedBooks;
//   return (
//     <div>
//       <Navbar />
//       <div className="hikes-container">
//         <h1>Completed Hikes</h1>
//         <ul class="list-group">
//           <li className="list-group-item">An item</li>
//           <li className="list-group-item">A second item</li>
//           <li className="list-group-item">A third item</li>
//           <li className="list-group-item">A fourth item</li>
//           <li className="list-group-item">And a fifth one</li>
//         </ul>
//         <h1>Future Hikes</h1>
//         <ul class="list-group">
//           <li className="list-group-item">An item</li>
//           <li className="list-group-item">A second item</li>
//           <li className="list-group-item">A third item</li>
//           <li className="list-group-item">A fourth item</li>
//           <li className="list-group-item">And a fifth one</li>
//         </ul>
//       </div>
//     </div>
//   );
// }
