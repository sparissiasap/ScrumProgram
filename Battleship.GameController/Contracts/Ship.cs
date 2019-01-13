using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Media;
using Battleship.GameController.Annotations;

namespace Battleship.GameController.Contracts
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// The ship.
    /// </summary>
    public class Ship: INotifyPropertyChanged
    {
        private bool isPlaced;

        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="Ship"/> class.
        /// </summary>
        public Ship()
        {
            Positions = new List<Position>();
        }

        #endregion

        #region Public Properties

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the positions.
        /// </summary>
        public List<Position> Positions { get; set; }

        /// <summary>
        /// The color of the ship
        /// </summary>
        public Color Color { get; set; }

        /// <summary>
        /// Gets or sets the size.
        /// </summary>
        public int Size { get; set; }

        public bool die { get; set; }
        public bool isSunk { get; set; }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// The add position.
        /// </summary>
        /// <param name="input">
        /// The input.
        /// </param>
        public void AddPosition(string input)
        {
            if (Positions == null)
            {
                Positions = new List<Position>();
            }
            if(input != string.Empty)
            {
                var position = FormatPosition(input);
                Positions.Add(position);
            }
        }

        public bool IsValidPosition(string input, List<Ship> myFleet)
        {
            if (input == string.Empty || input.Length > 2)
                return false;

            try
            {
                Position newPosition = FormatPosition(input);
          
                if (myFleet.Any(x => x.Positions.Contains(newPosition)))
                    return false;
                else return true;
            }
            catch
            {
                return false;
            }
        }

        private static Position FormatPosition(string input)
        {
            var letter = (Letters)Enum.Parse(typeof(Letters), input.ToUpper().Substring(0, 1));
            var number = int.Parse(input.Substring(1, 1));
            return new Position { Column = letter, Row = number }; ;
        }

        public bool IsPlaced
        {
            get { return isPlaced; }
            set
            {
                if (value.Equals(isPlaced)) return;
                isPlaced = value;
                OnPropertyChanged();
            }
        }

        #endregion

        public event PropertyChangedEventHandler PropertyChanged;

        [NotifyPropertyChangedInvocator]
        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChangedEventHandler handler = PropertyChanged;
            if (handler != null) handler(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}