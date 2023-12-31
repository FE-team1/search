<h1> CORS 에러 </h1> 


<h2> ➡️ CORS란? </h2>

Cross Origin Resource Sharing <br>
>  프론트엔드 개발자 입장에서는 요청코드를 이상하게 적은것도 없고, 백엔드 개발자 입장에서는 서버 코드나 세팅이 이상한 것도 아닌 모든게 멀쩡한데 요청한 자료에 대한 응답을 에러로 확답하는게 문제였다.<br>
>  이러한 현상이 일어나는 이유는, 웹 브라우저는 HTTP 요청에 대해서 어떤 요청을 하느냐에 따라 각기 다른 특징을 가지고 있기 때문이다.<br><br>

<h2> ➡️ CORS 에러 해결하기 </h2>

<h3> 클라이언트에서 해결하기 </h3>

1. 웹 브라우저 실행 옵션이나 플러그인을 통한 동일 출처 정책 회피하기<br>
>  동일 출처 정책은 브라우저에서 임의로 하는 것이기 때문에 브라우저에서 동일 출처 정책을 사용하지 않으며 된다.<br>

2. jsonp 방식으로 json 데이터 가져오기<br>
>  자바스크립트 파일이나 css 파일은 동일 출처 정책에 영향을 받지 않고 가져올 수 있다.<br>
>  이를 이용해서 자바스크립트 파일을 가져와서 이를 json 형식으로 파싱해서 데이터를 사용할 수 있다.<br>

```
@CrossOrigin(origin="*", allowedHeaders = "*")
@Controller
public class MainController {
	@GetMapping(path = "/")
	public String main(Model model) {
		return "main";
	}
}
```

<h3> 서버에서 해결하기 </h3>  

스프링 CORS<br>
1.  @CrossOrigin 어노테이션 사용하기<br>
> 기본적으로 @CrossOrigin은 모든 출처, 모든 헤더, @RequestMapping 주석에 지정된 Http 메소드에 최대 30분을 허용한다. 어노테이션에 속성 값을 넣어 기본 값을 대체할 수 있다.<br>
> 속성값을 살펴보면,<br>
>  >  1) origins - 허용된 출처, 이 값은 pre-flight 응답과 실제 응답 모두에 access-control-allow-origin헤더에 배치된다.<br>
>  >  2) allowedHeaders - 실제 요청 중에 사용할 수 있는 요청 헤더 목록이다. pre-flight의 응답 헤더인 access-control-allow-header에 값이 사용된다.<br>
>  >  3) allowCredential - 브라우저가 요청과 관련된 쿠키를 포함해야 되는지 여부를 결정한다.<br>
                             - 이 값이 true이면, pre-flight 응답에는 값이 true로 설정된 access-control-allow-credentials 헤더가 포함된다.<br>

2. CorsFilter 사용하기<br>
> 웹 서버의 모든 리소스의 요청을 가로채서 Cross domain request인지 체크하여 실제 요청 페이지에 전달하기전에 적절한 CORS 정책과 해더들을 적용한다.<br>
>> 1) Access-Control-Allow-Origin - 도메인 간 요청을 할 수 있는 권한이 부여된 도메인을 지정한다.<br>
>> 2) Access-Control-Allow-Credentials - 도메인 간 요청에 credential 권한이 있는지 없는지 지정한다.<br>
>> 3) Access-Control-Expose-Headers - 노출하기에 안전한 헤더를 나타낸다.<br>
>> 4) Access-Control-Max-Age - pre-flighted 요청이 얼마만큼의 시간동안 캐시되는지<br>
>> 5) Access-Control-Allow-Methods - 리소스에 접근할 때 메소드가 허용되는지<br>
>> 6) Access-Control-Allow-Headers - 어떤 헤더 필드 네임이 실제 요청에서 사용할 수 있는지 가리킨다.<br>


```
@Component
public class SimpleCorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, PATCH");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
        chain.doFilter(req, res);
    }

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void destroy() {
    }
}
```
