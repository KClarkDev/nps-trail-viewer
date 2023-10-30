export const getSavedTrailIds = () => {
  const savedTrailIds = localStorage.getItem("savedTrails")
    ? JSON.parse(localStorage.getItem("savedTrails"))
    : [];

  return savedBookIds;
};

export const saveTrailIds = (trailIdArr) => {
  if (trailIdArr.length) {
    localStorage.setItem("savedTrails", JSON.stringify(trailIdArr));
  } else {
    localStorage.removeItem("savedTrails");
  }
};

export const removeTrailId = (trailId) => {
  const savedTrailIds = localStorage.getItem("savedTrails")
    ? JSON.parse(localStorage.getItem("savedTrails"))
    : null;

  if (!savedTrailIds) {
    return false;
  }

  const updatedSavedTrailIds = savedTrailIds?.filter(
    (savedTrailId) => savedTrailId !== trailId
  );
  localStorage.setItem("savedTrails", JSON.stringify(updatedSavedTrailIds));

  return true;
};
