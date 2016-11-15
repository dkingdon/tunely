var mongoose = require("mongoose");
var Schema = mongoose.Schema;

  var AlblumSchema = new Schema({
    artistName: String,
    name: String,
    releaseDate: String,
    genres: [String]
  });

var Album = mongoose.model('Frame', FrameSchema);

model.export = Frame;
