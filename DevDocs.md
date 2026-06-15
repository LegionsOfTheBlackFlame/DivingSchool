Bilyaz Diving School Development Documentation

Apps:
    
    Client :
    -dir: DivingSchool\client-react
    -script: npm run build npm run preview

    Development Server:
    -dir: DivingSchool\server
    -script: npm start

Client Modules:
index.html = base document and mount point
main.jsx = entry file / bootstrap file
StrictMode = development checker
router.jsx = route configuration
createBrowserRouter = creates browser-based routing config
App.jsx = shared layout / application shell
child pages = route components rendered inside the layout
<Outlet /> = placeholder where child routes render

todo:
-migrate database
[done]-troubleshoot development server
-add whatsapp button in app.jsx layer
-remove duplicate default section
-Init Dives database table

36°53'01.7"N 30°42'01.5"E st.didier wreck
36°52'59.7"N 30°40'56.7"E cave
36°53'03.7"N 30°41'50.7"E falezler
36°52'54.0"N 30°40'41.5"E




