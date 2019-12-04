/**
 * Unit tests for geo-related utility functions
 */

const {expect} = require('chai');
const {calculateSlope,isPointAboveLine,isPointBelowLine,isPointRightOfLine} = require('../../Geo/utils')

describe('#geo Utilities',()=>{
    describe('#calculateSlope',()=>{
        it('should return correct slope',()=>{
            const line = [
                [10,20],
                [15,10]
            ];
            expect(calculateSlope(line)).equal(-2);
        });

        it('should return Infinity when division by zero',()=>{
            const line = [
                [10,20],
                [10,10]
            ];
            expect(calculateSlope(line)).equal(Number.POSITIVE_INFINITY);
        });
    });

    describe('#isPointAboveLine',()=>{
        it('should return true for a point above a line',()=>{
            const point = [3,4];
            expect(isPointAboveLine(point,[[1,1],[3,3]])).equals(true);
            expect(isPointAboveLine(point,[[3,3],[1,1]])).equals(true);
        })
        it('should return false for a point not above a line',()=>{
            const point = [1,2];
            expect(isPointAboveLine(point,[[1,4],[4,1]])).equals(false);
            expect(isPointAboveLine(point,[[4,1],[1,4]])).equals(false);
        })
    });

    describe('#isPointBelowLine',()=>{
        it('should return true for a point below a line',()=>{
            const point = [1,0];
            expect(isPointBelowLine(point,[[1,4],[4,1]])).equals(true);
            expect(isPointBelowLine(point,[[4,1],[1,4]])).equals(true);
            
        })
        it('should return false for a point not below a line',()=>{
            const point = [3,4];
            expect(isPointBelowLine(point,[[1,1],[3,3]])).equals(false);
            expect(isPointBelowLine(point,[[3,3],[1,1]])).equals(false);
        })
    });

    describe('#isPointRightOfLine',()=>{
        it('should return true for a point right of a line',()=>{
            const point = [4,3];
            expect(isPointRightOfLine(point,[[1,1],[3,3]])).equals(true);
            expect(isPointRightOfLine(point,[[3,3],[1,1]])).equals(true);
            
        })
        it('should return false for a point not right of a line',()=>{
            const point = [1,2];
            expect(isPointRightOfLine(point,[[2,1],[4,4]])).equals(false);
            expect(isPointRightOfLine(point,[[2,1],[4,4]])).equals(false);
        })
    });
});