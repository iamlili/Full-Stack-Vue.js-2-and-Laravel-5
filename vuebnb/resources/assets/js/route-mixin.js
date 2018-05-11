import axios from 'axios'; //for performing ajax. Already included in Laravel's default frontend code. eg axios.get('my-url'); To get the response chain a 'then' callback

function getData(to) {

    return new Promise ( resolve => {

        let serverData = JSON.parse(window.vuebnb_server_data); // moved this line into this navigation guard, (which was originally outside of the component default block), so that we can update the data when we switch between routes

        console.log(`server data path = ${serverData.path}`);
        console.log(to);

        if(!serverData.path || to.path !== serverData.path){
            console.log("We need new data!!! We will ajax it.");

            // this is my version // see below for es6's destructuring syntax to just extract the 'data' variable form the response object  
            // axios.get('/api/'+to.path).then(response => { console.log(response.data);
            //     resolve(response.data)
            // });
            // same as above but showing es6's destructuring syntax to just extract the 'data' variable form the response object  
            axios.get(`/api/${to.path}`).then(({ data }) => { console.log(data);
               resolve(data)
            });
        
        } else {
            resolve (serverData);
        }
    });
}

export default {
    /* This is a Route navigation guard, similar to vue lifecycle hooks, allowing you to hook into particular pointsduring the routing
    * they can be applied to components, specific routes or all routes
    *  */
    beforeRouteEnter(to, from, next) {
        getData(to).then( data => { console.log('got data'); console.log(data);
            //in the beforeRouteEnter nav guard the next() function allows you to pass in a callback function, for example in this line 'component' is the page component instance. The CB function is not triggered until the route is confirmed, and will have access to the scope of the surrounding code where it was called
            next(component => component.assignData(data)); // next() function: important in navigation guards. Everything is stopped until this is called, allowing asynchronous code to by executed before navigation continues. Pass it a false to prevent navigation. If nothing is passed navigation will be assume confirmed.
            // the assignData method is our own method which we need to have in each of the components that use this mixin
        });
    }
}