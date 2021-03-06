const { resources } = require('../');
const { SVGResource } = resources;
const fs = require('fs');
const path = require('path');

describe('PIXI.resources.SVGResource', function ()
{
    before(function ()
    {
        this.resources = path.join(__dirname, 'resources');
    });

    describe('constructor', function ()
    {
        it('should create new resource from data-uri', function (done)
        {
            const url = path.join(this.resources, 'svg-base64.txt');
            const buffer = fs.readFileSync(url, 'utf8');
            const resource = new SVGResource(buffer, { autoLoad: false });

            resource.load().then(function ()
            {
                expect(resource.width).to.equal(100);
                expect(resource.height).to.equal(100);

                done();
            });
        });

        it('should create resource from SVG URL (heart.svg)', function (done)
        {
            const resource = new SVGResource(
                path.join(this.resources, 'heart.svg'),
                { autoLoad: false }
            );

            resource.load().then(function ()
            {
                expect(resource.width).to.equal(100);
                expect(resource.height).to.equal(100);

                done();
            });
        });

        it('should create resource from SVG URL (ai_export.svg)', function (done)
        {
            const resource = new SVGResource(
                path.join(this.resources, 'ai_export.svg'),
                { autoLoad: false }
            );

            resource.load().then(function ()
            {
                expect(resource.width).to.equal(18);
                expect(resource.height).to.equal(18);

                done();
            });
        });

        it('should create resource from inline SVG', function (done)
        {
            const url = path.join(this.resources, 'heart.svg');
            const buffer = fs.readFileSync(url, 'utf8');
            const resource = new SVGResource(buffer, { autoLoad: false });

            resource.load().then(function ()
            {
                expect(resource.width).to.equal(100);
                expect(resource.height).to.equal(100);

                done();
            });
        });
    });

    describe('getSize', function ()
    {
        it('should exist', function ()
        {
            expect(SVGResource.getSize)
                .to.be.a('function');
        });

        it('should return a size object with width and height from an SVG string', function ()
        {
            const svgSize = SVGResource.getSize('<svg height="32" width="64"></svg>');

            expect(svgSize)
                .to.be.an('object');
            expect(svgSize.width)
                .to.equal(64);
            expect(svgSize.height)
                .to.equal(32);
        });

        it('should return a size object with width and height inferred from viewBox in an SVG string', function ()
        {
            const svgSize = SVGResource.getSize('<svg viewBox="0 0 64 32"></svg>');

            expect(svgSize)
                .to.be.an('object');
            expect(svgSize.width)
                .to.equal(64);
            expect(svgSize.height)
                .to.equal(32);
        });

        it('should return a size object from an SVG string with inverted quotes', function ()
        {
            const svgSize = SVGResource.getSize("<svg height='32' width='64'></svg>"); // eslint-disable-line quotes

            expect(svgSize)
                .to.be.an('object');
            expect(svgSize.width)
                .to.equal(64);
            expect(svgSize.height)
                .to.equal(32);
        });

        it('should work with px values', function ()
        {
            const svgSize = SVGResource.getSize('<svg height="32px" width="64px"></svg>');

            expect(svgSize)
                .to.be.an('object');
            expect(svgSize.width)
                .to.equal(64);
            expect(svgSize.height)
                .to.equal(32);
        });

        it('should return an empty object when width and/or height is missing', function ()
        {
            const svgSize = SVGResource.getSize('<svg width="64"></svg>');

            expect(Object.keys(svgSize).length)
                .to.equal(0);
        });
    });
});
