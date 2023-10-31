import Navbar from "../components/Navbar";
import "../styles/myHikes.css";
import { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { removeTrailId } from "../utils/localStorage";
import { GET_ME } from "../utils/queries";
import { REMOVE_TRAIL } from "../utils/mutations";

export default function SavedHikes() {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.getMe || {};
  console.log("Here's the user data:");
  console.log(userData);

  const [removeTrail, { error }] = useMutation(REMOVE_TRAIL);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteTrail = async (trailId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeTrail({
        variables: { trailId: trailId },
      });

      // upon success, remove book's id from localStorage
      removeTrailId(trailId);
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
            ? `Viewing ${userData.savedTrails.length} saved ${
                userData.savedTrails.length === 1 ? "trail" : "trails"
              }:`
            : "You have no saved trails!"}
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
                      onClick={() => handleDeleteTrail(trail.trailId)}
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