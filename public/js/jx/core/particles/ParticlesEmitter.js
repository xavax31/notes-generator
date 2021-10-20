define(["exports", "jx/core/comps/VisualComponent"], function (exports, _VisualComponent2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponent3 = _interopRequireDefault(_VisualComponent2);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var particlesEmitterDefaults = {
        type: ""
    };

    var ParticlesEmitter = function (_VisualComponent) {
        _inherits(ParticlesEmitter, _VisualComponent);

        function ParticlesEmitter(dataObject) {
            _classCallCheck(this, ParticlesEmitter);

            var _this = _possibleConstructorReturn(this, (ParticlesEmitter.__proto__ || Object.getPrototypeOf(ParticlesEmitter)).call(this, Object.assign(particlesEmitterDefaults, dataObject)));

            _this.tempData = {};
            _this.onFinished = new signals.Signal();
            _this._create();
            _this._activated = false;
            _this._listeners = {
                draw: function draw(evt) {
                    return _this._draw();
                }
            };
            return _this;
        }

        _createClass(ParticlesEmitter, [{
            key: "_create",
            value: function _create() {
                this.context = this.dataObject.targetView.canvas.getContext('2d');
                this.particleImage = this.dataObject.image;
                this.particles = [];
                this.maxParticles = 10;
            }
        }, {
            key: "createExplosion",
            value: function createExplosion(posX, posY, particleSize, explosionSize, lifetime, speed, gravity) {
                posX = posX - particleSize * .5;
                posY = posY - particleSize * .5;
                var speed = particleSize * speed * .01;
                for (var i = 1; i < explosionSize; i++) {
                    for (var j = 0; j < 1 * i; j++) {
                        if (this.particles.length < this.maxParticles) {
                            this.particles.push(new Particle(posX, posY, particleSize, particleSize, i * speed, gravity, lifetime * Math.random()));
                        }
                    }
                }
            }
        }, {
            key: "_draw",
            value: function _draw() {
                var leavingParticles = [];
                for (var i = this.particles.length - 1; i >= 0; i--) {
                    this.particles[i].moves++;
                    this.particles[i].x += this.particles[i].xunits;
                    this.particles[i].y += this.particles[i].yunits + this.particles[i].gravity * this.particles[i].moves;
                    if (this.particles[i].moves < this.particles[i].life) {
                        leavingParticles.unshift(this.particles[i]);
                        this.context.globalAlpha = 1 - this.particles[i].moves / this.particles[i].life;
                        this.context.drawImage(this.particleImage, Math.floor(this.particles[i].x), Math.floor(this.particles[i].y), this.particles[i].width, this.particles[i].height);
                        this.context.globalAlpha = 1;
                    }
                }
                this.particles = leavingParticles;
            }
        }, {
            key: "active",
            set: function set(value) {
                if (value == this._activated) return;
                this._activated = value;
                if (value) {
                    createjs.Ticker.addEventListener("tick", this._listeners.draw);
                } else {
                    createjs.Ticker.removeEventListener("tick", this._listeners.draw);
                }
            }
        }]);

        return ParticlesEmitter;
    }(_VisualComponent3.default);

    exports.default = ParticlesEmitter;

    var Particle = function Particle(x, y, width, height, speed, gravity, life) {
        _classCallCheck(this, Particle);

        var angle = Math.floor(Math.random() * 360);
        var radians = angle * Math.PI / 180;

        this.x = x;
        this.y = y;

        this.height = height;
        this.width = width;

        this.speed = speed;

        this.gravity = gravity;

        this.life = life;

        this.moves = 0;

        this.xunits = Math.cos(radians) * this.speed;

        this.yunits = Math.sin(radians) * this.speed;
    };
});
//# sourceMappingURL=ParticlesEmitter.js.map