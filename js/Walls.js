function Walls() {
    PIXI.Container.call(this);

    this.pool = new WallSpritesPool();
    this.createLookupTables();

    this.slices = [];
    this.createTestMap();
}

Walls.prototype = Object.create(PIXI.Container.prototype);

Walls.prototype.addSlice = function (sliceType, y) {
    let slice = new WallSlice(sliceType, y);
    this.slices.push(slice);
};

Walls.prototype.createLookupTables = function () {
    this.borrowWallSpriteLookup = [];
    this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
    this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
    this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
    this.borrowWallSpriteLookup[SliceType.DECORATION] = this.pool.borrowDecoration;
    this.borrowWallSpriteLookup[SliceType.WINDOW] = this.pool.borrowWindow;

    this.returnWallSpriteLookup = [];
    this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
    this.returnWallSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
    this.returnWallSpriteLookup[SliceType.STEP] = this.pool.returnStep;
    this.returnWallSpriteLookup[SliceType.DECORATION] = this.pool.returnDecoration;
    this.returnWallSpriteLookup[SliceType.WINDOW] = this.pool.returnWindow;
};

Walls.prototype.borrowWallSprite = function (sliceType) {
    return this.borrowWallSpriteLookup[sliceType].call(this.pool);
};

Walls.prototype.returnWallSprite = function (sliceType, sliceSprite) {
    return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite);
};


Walls.prototype.createTestWallSpan = function () {
    this.addSlice(SliceType.FRONT, 192);
    this.addSlice(SliceType.WINDOW, 192);
    this.addSlice(SliceType.DECORATION, 192);
    this.addSlice(SliceType.WINDOW, 192);
    this.addSlice(SliceType.DECORATION, 192);
    this.addSlice(SliceType.WINDOW, 192);
    this.addSlice(SliceType.DECORATION, 192);
    this.addSlice(SliceType.WINDOW, 192);
    this.addSlice(SliceType.BACK, 192);
};

Walls.prototype.createTestSteppedWallSpan = function () {
    this.addSlice(SliceType.FRONT, 192);
    this.addSlice(SliceType.WINDOW, 192);
    this.addSlice(SliceType.DECORATION, 192);
    this.addSlice(SliceType.STEP, 256);
    this.addSlice(SliceType.WINDOW, 256);
    this.addSlice(SliceType.BACK, 256);
};

Walls.prototype.createTestGap = function () {
    this.addSlice(SliceType.GAP);
};


Walls.prototype.createTestMap = function () {
    for (var i = 0; i < 10; i++) {
        this.createTestWallSpan();
        this.createTestGap();
        this.createTestSteppedWallSpan();
        this.createTestGap();
    }
};

