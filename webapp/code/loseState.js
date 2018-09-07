/**
	State shown when the player loses!
	Code by Rob Kleffner, 2011
*/

Mario.LoseState = function() {
    this.drawManager = null;
    this.camera = null;
    this.gameOver = null;
    this.font = null;
    this.wasKeyDown = false;
};

Mario.LoseState.prototype = new Enjine.GameState();

Mario.LoseState.prototype.Enter = function() {
    this.drawManager = new Enjine.DrawableManager();
    this.camera = new Enjine.Camera();
    
    this.gameOver = new Enjine.AnimatedSprite();
    this.gameOver.Image = Enjine.Resources.Images["gameOverGhost"];
    this.gameOver.SetColumnCount(9);
    this.gameOver.SetRowCount(1);
    this.gameOver.AddNewSequence("turnLoop", 0, 0, 0, 8);
    this.gameOver.PlaySequence("turnLoop", true);
    this.gameOver.FramesPerSecond = 1/5;
    this.gameOver.X = 112;
    this.gameOver.Y = 36;
    
    this.font = Mario.SpriteCuts.CreateBlackFont();
    this.font.Strings[0] = { String: "RABAX", X: 20, Y: 60 };
    this.font2 = Mario.SpriteCuts.CreateBlackFont();
    this.font2.Strings[0] = { String: "call basis!", X: 220, Y: 60 };
    
    this.drawManager.Add(this.font);
    this.drawManager.Add(this.font2);
    this.drawManager.Add(this.gameOver);
};

Mario.LoseState.prototype.Exit = function() {
    this.drawManager.Clear();
    delete this.drawManager;
    delete this.camera;
    delete this.gameOver;
    delete this.font;
};

Mario.LoseState.prototype.Update = function(delta) {
    this.drawManager.Update(delta);
    if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S)) {
        this.wasKeyDown = true;
    }
};

Mario.LoseState.prototype.Draw = function(context) {
    this.drawManager.Draw(context, this.camera);
};

Mario.LoseState.prototype.CheckForChange = function(context) {
    if (this.wasKeyDown && !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S)) {
        context.ChangeState(new Mario.TitleState());
    }
};