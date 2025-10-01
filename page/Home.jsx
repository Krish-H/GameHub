import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center">
      {/* Title */}
      <h1 className="text-5xl font-extrabold drop-shadow-lg mb-6">
        🎮 Welcome to GameHub
      </h1>
      <p className="text-lg max-w-md mb-8">
        Choose your favorite game and start playing with friends or against the computer.
      </p>

      {/* Buttons */}
      <div className="flex gap-6">
        <Link to="/newgame">
          <button className="bg-green-500 hover:bg-green-700 transition px-6 py-3 rounded-2xl shadow-lg text-xl font-bold">
            Start Game 🚀
          </button>
        </Link>
        <Link to="/games">
          <button className="bg-yellow-400 hover:bg-yellow-500 transition px-6 py-3 rounded-2xl shadow-lg text-xl font-bold text-black">
            More Games 🎲
          </button>
        </Link>
      </div>

      {/* Footer */}
      <p className="mt-12 text-sm opacity-80">
        Built with ❤️ using React & Socket.IO
      </p>
    </div>
  );
};

export default Home;
