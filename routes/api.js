const router = require("express").Router();
const Workout = require("../models/workout");

router.get("/workouts", (req, res) => {
    Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


router.post("/workouts", (req, res) => {
  Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// getting workouts by ID
router.put("/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(params.id, 
    {
      $push: { exercises: body}
    })
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.json(400).json(err);
    });
});

// look up .aggregate for mongoose in order to get this answer
const aggregate = Workout.aggregate([
  { $workout: { $sum: "$exercise.duration" } },
]);

router.delete("/workouts", (req, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      return res.json(true);
    })
    .catch((err) => {
      res.json(400).json(err);
    });
});

module.exports = router;
