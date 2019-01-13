namespace Battleship.GameController.Tests.GameControllerTests
{
    using System.Collections.Generic;
    using System.Linq;
    using Battleship.GameController.Contracts;

    using Microsoft.VisualStudio.TestTools.UnitTesting;

    /// <summary>
    /// The is ship valid tests.
    /// </summary>
    [TestClass]
    public class IsShipValidTests
    {
        /// <summary>
        /// The ship is not valid.
        /// </summary>
        [TestMethod]
        public void ShipIsNotValid()
        {
            var ship = new Ship { Name = "TestShip", Size = 3 };
            var result = GameController.IsShipValid(ship);

            Assert.IsFalse(result);
        }

        /// <summary>
        /// The ship is valid.
        /// </summary>
        [TestMethod]
        public void ShipIsValid()
        {
            var positions = new List<Position> { new Position(Letters.A, 1), new Position(Letters.A, 1), new Position(Letters.A, 1) };

            var ship = new Ship { Name = "TestShip", Size = 3, Positions = positions };
            var result = GameController.IsShipValid(ship);

            Assert.IsTrue(result);
        }

        /// <summary>
        /// The ship is valid.
        /// </summary>
        [TestMethod]
        public void AddEmptyPosition()
        {
            var ship = new Ship();
            ship.AddPosition("");

            Assert.IsTrue(ship.Positions.Count == 0);
        }

        [Microsoft.VisualStudio.TestTools.UnitTesting.TestMethod]
        public void DontAllowToOverlapAShip()
        {
            var ships = GameController.InitializeShips().ToList();
            ships[0].AddPosition("A1");

            Assert.IsFalse(ships[0].IsValidPosition("A1", ships));
            Assert.IsTrue(ships[0].Positions.Count > 0);
        }

        [TestMethod]
        public void IsValidPositionTest()
        {
            var ships = GameController.InitializeShips().ToList();
            Assert.IsTrue(ships[0].IsValidPosition("A1", ships));
        }
    }
}