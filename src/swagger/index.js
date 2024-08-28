/**
 * * as Swagger는 모듈에서 모든 exports를 Swagger라는 이름으로 가져온다는 의미
 * * Swagger는 ../controllers/swagger 파일에서 가져온 모든 export를 포함하는 객체가 됩니다.
 */
// import * as Swagger from "../controllers/swagger";
import * as UserSwagger from '../users/swagger';
import DefaultSwagger from "./defaultSwagger";

const Swaggers = {
    ...UserSwagger,
}

// 1) 가공하는 코드
const { paths } = Object.values(Swaggers).reduce(
    (acc, apis) => {
        const APIs = Object.values(apis);

        APIs.forEach((api) => {
            const key = Object.keys(api)[0];
            const methods = api[key];

            // 병합 로직: 기존 paths 객체에 새로운 메서드를 추가
            if (!acc.paths[key]) {
                acc.paths[key] = methods;
            } else {
                acc.paths[key] = {
                    ...acc.paths[key],  // 기존 메서드
                    ...methods  // 새로운 메서드
                };
            }
        });

        return acc;
    },
    { paths: {} }
);


// 2) 스웨거에 등록할 json 만들기 DefaultSwagger + 1 에서 가공한 path

export const swaggerDocs = {
    ...DefaultSwagger,
    // paths 등록 
    paths,
    
};

//3) 스웨거에 등록하는 방법
export const options = {
    swaggerOptions: {
        url: "/swagger.json"
    }
};
