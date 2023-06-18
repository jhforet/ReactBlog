# 리엑트로 블로그 만들기 연습

## 목적
리엑트로 블로그를 만들면서 리엑트 공부

## 변경사항 기록
1. **리엑트 설치 및 Blog에 글을 작성하고 저장하는 기능 생성**  
axios, json-server, react-router-dom 추가로 공부하기

2. **Component, Page 파일을 생성해서 분리, routes로 정리**  
    * 중복해서 사용하는 BlogForm, NavBar Component로 정리  
    * Page 컴포넌트는 page폴더를 만들어서 정리  
    * routes.js를 만들어서 메뉴 부분만 따로 정리  
    * react router bom에 Nav Link 기능을 활용해서 버튼을 선택했을 때 active 효과 추가

3. **블로그 만들기 3**  
    * ListPage.js에서 useEffect으로 블로그 리스트 데이터 받아오기  
    * 받아온 데이터 map 메서드로 화면에 출력하기  
    * 부트스트랩 카드를 이용해서 Card 컴포넌트 만들기  
        + ListPage.js에서 props로 넘겨서 {title}로 받음  
    * props children으로 Card 사이에 자식만들기  
    * prop-types으로 타입지정  
        + prop-types가 정확하게 어떤 기능을 하는지 모르겠어서 추가로 공부하기  
    * ListPage.js에 Link를 이용해서 생성 버튼 추가  

4. **블로그 만들기 4**
    * 전에는 React Router v5를 사용하다가 v6로 업데이트 하면서 변경된 컴포넌트나 속성등을 수정  
    * 게시글을 클릭하면 수정 페이지로 이동  
        + ListPage에서 useNavigate 컴포넌트로 onClick 이벤트가 발생하면 EditPage로 이동  
        + 마우스를 올려도 포인터 모양이 안나와서 index.css에 .cursor-pointer class 효과 추가  
        + Card 컴포넌트 className에 위에 추가한 css효과 추가  
    * 삭제 버튼 이벤트 버블링 수정 stopPropagation()  
    * 삭제 기능 추가 라우터 공식홈페이지 참조  
    * 포스트가 없을 경우 안내 텍스트 추가  
    * 부트스트랩으로 로딩 스피너 컴포넌트 추가  
        + useState()와 if문을 사용해서 true이면 스피너가 보이고 false면 안보이게 설정  
        + 데이터 가져오는 부분에 setLoding을 넣어서 데이터가 불러오면 useState(false)로 변경되도록 설정  
    * Create New 버튼 기능 추가
        + 생성버튼을 누르면 연결되는 CreatePage에 BlogForm 컴포넌트를 임포트해서 글을 입력하는 페이지가 연결되도록 수정  
        + BlogForm에 useNavigate()를 추가해서 글을 등록하면 /blogs 로 이동하게 수정  

5. **블로그 만들기 5**
    * 게시글 카드를 클릭하면 내용을 보여주는 페이지 추가  
        + ShowPage.js 작성하고 Routes.js에 추가  
    * 게시글 db를 받아와서 화면에 보여주기  
        + ShowPage에 axios를 임포트해서 db 불러오기  
        + useState를 임포트하고 초기값은 null을 넣어 주고 받은 데이터를 setPost로 담는다.  
        + 받는 시간이 걸릴 수 있으므로 LoadingSpinner을 임포트 해서 추가해준다.  
        + ListPage에 Card 부분에 onClick 이벤트를 백틱을 사용해서 {post.id}로 연결되게 수정  
    * 게시글 작성 일자 추가  
        + BlogForm에 Date.now()를 사용해서 저장될 때 현재시간이 기록.  
        + 숫자로 보이니까 우리가 좋게 볼 수 있도록 함수를 생성  

6. **블로그 만들기 6**
    * Edit 페이지 만들기  
        + routes.js에 id별로 Edit 페이지가 나오도록 추가  
        + ShowPage에서 타이틀 옆에 react-router-dom Link로 Edit 버튼 추가  
        + EditPage에 BlogForm을 연결해서 컴포넌트 재활용  
        + 누르는 버튼에 따라서 다른 내용의 BlogForm을 보여주기 위해서 함수 추가, 해당 함수가 true일 경우 해당 페이지 출력  
    * BlogForm 수정  
        + BlogForm에 {editing} 을 prop으로 넣기 
        + editing에 따라서 다른 내용이 노출되도록 {editing ? '' : ''} 수정  
        + useEffect를 이용해서 edit 페이지일때는 데이터를 노출  
        + if문과 axios.patch로 수정사항 업데이트 기능 추가  
        + 수정사항이 있을 때만 버튼이 활성화 되는 기능 추가  
        + 뒤로가기 버튼과 goBack 함수 추가  
        + 공개 여부 기능 추가  

7. **블로그 만들기 7**
    * Admin 페이지 추가와 비공개 리스트 수정  
        + Publish가 false인 글은 /blogs에서 안보이도록 ListPage에 tilter로 수정  
        + AdminPage 추가 및 routes에 추가  
        + Adminpage에서만 모든 글이 보이고 삭제 할 수 있도록 수정  
        + Navbar에 Admin버튼 추가와 Css 수정  
        + 카드 컴포넌트 Css수정, 글 생성하면 /admin으로 이동하게 수정  