import { AbstractQuadrangle } from './abstraction/abstract-classes/abstract-quadrangle';
import { IQuadrangle } from './abstraction/interfaces/quadrangle';
import { Rectangle, RectangleFromAbstract, RectangleWithInfo } from './implementation/rectangle';
import { Square, SquareFromAbstract } from './implementation/square';
import { ApiObject, ApiObjectDto } from './models/index';

async function getApiObjectsData(): Promise<ApiObjectDto[]> {
    const response = await fetch('https://api.restful-api.dev/objects');
    const json = await response.json();
    return json as ApiObjectDto[];
}

async function getApiObjectsDataAsObjectWithClass(): Promise<ApiObject[]> {
    const response = await fetch('https://api.restful-api.dev/objects');
    const json = await response.json();
    return (json as Record<string, unknown>[]).map((row) => new ApiObject(row));
}

function getQuadrangleInfo(quadrangle: IQuadrangle): string {
    return `Perimeter is ${quadrangle.getPerimeter()} and Area is ${quadrangle.getArea()}`;
}

function getQuadrangleInfoFromAbstract(quadrangle: AbstractQuadrangle): string {
    return `Perimeter is ${quadrangle.getPerimeter()} and Area is ${quadrangle.getArea()} and name is ${AbstractQuadrangle.qname}`;
}

(async () => {
    const apiObjects = await getApiObjectsData();
    const notNullApiObjects = apiObjects.filter((apiObject) => apiObject.data !== null);
    const objectsWithCapacity = notNullApiObjects.filter((apiObject) => apiObject.data?.capacity);
    console.log(objectsWithCapacity);


    const apiObjectsWithClass = await getApiObjectsDataAsObjectWithClass();
    const filteredObjects = apiObjectsWithClass.filter((apiObject) => apiObject.hasCapacityGb());
    console.log(filteredObjects);

    apiObjectsWithClass.forEach((apiObject) => console.log(apiObject.getSummary()));

    // will throw exception because class instance is not created
    // const apiObjectsWithClassWithoutInstance = await getApiObjectsDataAsObjectWithClassWithoutInstance();
    // apiObjectsWithClassWithoutInstance.forEach((apiObject) => console.log(apiObject.getSummary()));

})();

const rectangle = new Rectangle(1, 2);
const square = new Square(5);
console.log(getQuadrangleInfo(rectangle));
console.log(getQuadrangleInfo(square));

const rectangle2 = new RectangleFromAbstract(3, 4);
const square2 = new SquareFromAbstract(7);
console.log(getQuadrangleInfoFromAbstract(rectangle2));
console.log(getQuadrangleInfoFromAbstract(square2));
AbstractQuadrangle.qname = 'quadrangle_changed';
console.log(getQuadrangleInfoFromAbstract(rectangle2));
console.log(getQuadrangleInfoFromAbstract(square2));

const extendedRectangle = new RectangleWithInfo(4, 5);
console.log(extendedRectangle.getSummary());
console.log(getQuadrangleInfoFromAbstract(extendedRectangle));
