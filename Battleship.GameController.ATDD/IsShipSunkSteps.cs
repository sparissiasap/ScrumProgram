using Battleship.GameController.Contracts;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using TechTalk.SpecFlow;

namespace Battleship.GameController.ATDD
{
    [Binding]
    public class IsShipSunkSteps
    {
        bool result = false;
        private static List<Ship> enemyFleet;

        public IsShipSunkSteps()
        {
            enemyFleet = GameController.InitializeShips().ToList();
            enemyFleet[0].Positions.Add(new Position { Column = Letters.A, Row = 1 });
            enemyFleet[0].Positions.Add(new Position { Column = Letters.A, Row = 2 });
            enemyFleet[0].Positions.Add(new Position { Column = Letters.A, Row = 3 });
            enemyFleet[0].Positions.Add(new Position { Column = Letters.A, Row = 4 });
            enemyFleet[0].Positions.Add(new Position { Column = Letters.A, Row = 5 });
        }

        [Given(@"I have entered first position ""(.*)""")]
        public void GivenIHaveEnteredFirstPosition(string p0)
        {
            var letter = (Letters)Enum.Parse(typeof(Letters), p0.ToUpper().Substring(0, 1));
            var number = 0;
            int.TryParse(p0.Substring(1, p0.Length - 1), out number);
            Position position = new Position(letter, number);
            GameController.CheckIsHit(enemyFleet, position);
        }

        [Given(@"I have entered second position ""(.*)""")]
        public void GivenIHaveEnteredSecondPosition(string p0)
        {
            var letter = (Letters)Enum.Parse(typeof(Letters), p0.ToUpper().Substring(0, 1));
            var number = 0;
            int.TryParse(p0.Substring(1, p0.Length - 1), out number);
            Position position = new Position(letter, number);
            GameController.CheckIsHit(enemyFleet, position);
        }

        [Given(@"I have entered thrid position ""(.*)""")]
        public void GivenIHaveEnteredThridPosition(string p0)
        {
            var letter = (Letters)Enum.Parse(typeof(Letters), p0.ToUpper().Substring(0, 1));
            var number = 0;
            int.TryParse(p0.Substring(1, p0.Length - 1), out number);
            Position position = new Position(letter, number);
            GameController.CheckIsHit(enemyFleet, position);
        }

        [Given(@"I have entered fourth position ""(.*)""")]
        public void GivenIHaveEnteredFourthPosition(string p0)
        {
            var letter = (Letters)Enum.Parse(typeof(Letters), p0.ToUpper().Substring(0, 1));
            var number = 0;
            int.TryParse(p0.Substring(1, p0.Length - 1), out number);
            Position position = new Position(letter, number);
            GameController.CheckIsHit(enemyFleet, position);
        }

        [Given(@"I have entered fifth position ""(.*)""")]
        public void GivenIHaveEnteredFifthPosition(string p0)
        {
            var letter = (Letters)Enum.Parse(typeof(Letters), p0.ToUpper().Substring(0, 1));
            var number = 0;
            int.TryParse(p0.Substring(1, p0.Length - 1), out number);
            Position position = new Position(letter, number);
            GameController.CheckIsHit(enemyFleet, position);
        }

        [When(@"I check if the ships is sunk")]
        public void WhenICheckIfTheShipsIsSunk()
        {
            result = GameController.IsShipSunk(enemyFleet);
        }

        [Then(@"the IsShipSunk should be true")]
        public void ThenTheIsShipSunkShouldBeTrue()
        {
            Assert.AreEqual(true, result);
        }
    }
}
