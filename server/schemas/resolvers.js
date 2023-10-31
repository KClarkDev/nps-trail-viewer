const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  // retrieves a specific user by their username. Includes the user's saved books when returning the data
  Query: {
    getUser: async (parent, args, context) => {
      console.log("context.user for getUser:", context.user);
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    login: async (parent, { email, password }, context) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error
      if (!user) {
        throw AuthenticationError;
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw AuthenticationError;
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    addUser: async (parent, { username, email, password }, context) => {
      // First we create the user
      const user = await User.create({ username, email, password });
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    saveTrail: async (parent, args, context) => {
      console.log("context.user: for saveTrail", context.user);
      console.log("HERE ARE THE ARGS");
      console.log(args);
      if (context.user) {
        const { trailName, parkName } = args;
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedTrails: { trailName, parkName } } },
          { new: true }
        );
        console.log(updatedUser);
        return updatedUser;
      }

      throw AuthenticationError;
    },

    removeTrail: async (parent, args, context) => {
      console.log("context.user for removeTrail:", context.user);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedTrail: { trailId: args.trailId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
