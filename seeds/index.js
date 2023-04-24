const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect(
  "mongodb+srv://channyuniv:MuxfqEhbvn2zHjc3@cluster0.3qkj7od.mongodb.net/yelp-camp",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image:
        "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2FtcHx8fHx8fDE2ODIyNzQzNzA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas autem explicabo corporis? Est, corporis odit ut laudantium minima minus provident amet consequatur cum laboriosam magnam velit, officiis rerum eos modi?",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
