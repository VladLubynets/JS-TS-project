import { APIResponse } from 'playwright';
import { IApiService } from '../../services/abstractions/i-api-service';


export class RdApi {
    public constructor(private apiService: IApiService<APIResponse>) { }

    public async getRatings(): Promise<[unknown, APIResponse]> {
        // const body = {
        //     operationName: 'RatingQuery',
        //     variables: {
        //         project_id: 'e1e45826-67fe-4f5e-86c8-209707e002da',
        //         course: '2479',
        //         itemsPerPage: 30,
        //         showInList: true,
        //         roles: 'ROLE_STUDENT',
        //         order: {
        //             input: {
        //                 position: 'asc'
        //             }
        //         }
        //     },
        //     query: 'query RatingQuery($course: String, $itemsPerPage: Int, $page: Int, $order: [UserCourseFilter_order], $project_id: String, $roles: String, $showInList: Boolean) {\n  userCourses(\n    course: $course\n    itemsPerPage: $itemsPerPage\n    page: $page\n    order: $order\n    roles: $roles\n    user_profiles_projectId: $project_id\n    showInList: $showInList\n  ) {\n    paginationInfo {\n      totalCount\n      lastPage\n      __typename\n    }\n    collection {\n      id\n      points\n      position\n      successRate\n      doneTasksCount\n      roles\n      user {\n        id\n        email\n        profiles(projectId: $project_id) {\n          edges {\n            node {\n              rubies\n              id\n              initials\n              photo {\n                contentUrl\n                __typename\n              }\n              position\n              settings\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}'
        // };

        const queryStr = '{"operationName":"RatingQuery","variables":{"project_id":"e1e45826-67fe-4f5e-86c8-209707e002da","course":"3905","showInList":true,"roles":"ROLE_STUDENT","page":1,"order":{"input":{"position":"asc"}}},"query":"query RatingQuery($course: String, $itemsPerPage: Int, $page: Int, $order: [UserCourseFilter_order], $project_id: String, $roles: String, $showInList: Boolean) {\n  userCourses(\n    course: $course\n    itemsPerPage: $itemsPerPage\n    page: $page\n    order: $order\n    roles: $roles\n    user_profiles_projectId: $project_id\n    showInList: $showInList\n  ) {\n    paginationInfo {\n      totalCount\n      lastPage\n      __typename\n    }\n    collection {\n      id\n      points\n      position\n      successRate\n      doneTasksCount\n      roles\n      user {\n        id\n        profiles(projectId: $project_id) {\n          edges {\n            node {\n              rubies\n              id\n              initials\n              photo {\n                contentUrl\n                __typename\n              }\n              position\n              settings\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}"}';

        const response = await this.apiService.post('/api/graphql', queryStr);
        const bodyJson = await response.json();
        return [bodyJson, response as APIResponse];
    }
}
