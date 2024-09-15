Java.perform(() => {
    var GameActivityClass = Java.use("io.hextree.privacyfriendly2048.activities.GameActivity");
    GameActivityClass.generateNumber.implementation = function() {
        console.log("Spawning 2048");
        return 2048;
    }
  })