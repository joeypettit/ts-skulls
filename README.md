Upgrades:
-GameStates and Players are now stored in Maps, eliminating need for functions that check each array entries id.
-Game data is now stored in classes with helper methods
-conditional rendering is controlled using primarily the gamephase enum rather than checking for multiple seemingly unrelated conditionals in gamestate
-common models are shared between client and server via custom npm package

-
-

Things to do:
-incorporate error handler on client (error context?)
-Style front end without using vanilla css
-add game.id to the socket data rather than always passing it as action argument
-Error handling, both client and server
-popup notifications when important events happen ie players joins, player leaves
