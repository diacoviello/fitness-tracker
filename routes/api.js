const router = require("express").Router();
const mongoose = require("mongoose");
const Workout = require("../models/workout");

router.get("/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .limit(10)
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/workouts", ({ body }, res) => {
  console.log("POST /workouts");
  Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  console.log(body);
});

// getting workouts by ID
router.put("/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(params.id, {
    $push: { exercises: body },
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

router.delete("/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      return res.json(true);
    })
    .catch((err) => {
      res.json(400).json(err);
    });
});

module.exports = router;
