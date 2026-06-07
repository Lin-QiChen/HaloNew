from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from pathlib import Path
from fastapi.staticfiles import StaticFiles
# ─── API request/response models ────────────────────────────────────

class FetchRequest(BaseModel):
    url: str                     #【必填】目标网址：BOSS简历列表URL
    fetcher_type: str = "basic"  # 爬虫引擎类型：basic/playwright等，默认基础模式
    timeout: int = 30_000        # 超时时间，单位毫秒=30秒
    proxy: str = ""              # 正向代理地址 http://ip:端口，空=不使用代理（前面讲的正向代理配置位）
    wait: int = 0                # 页面加载后强制等待毫秒，用来等virtuoso虚拟列表动态渲染
    wait_selector: str = ""      # 等待指定CSS选择器元素出现再结束加载，例 "[data-item-index]"，等到简历DOM生成再拿源码
    solve_cloudflare: bool = False # 是否自动绕过Cloudflare人机验证
    network_idle: bool = False   # 等待页面所有网络请求空闲完毕再捕获HTML（BOSS下拉分页接口加载完）
    block_ads: bool = False     # 拦截广告、无用资源，加快页面加载
    headless: bool = True       # True=无头静默运行(不弹出浏览器窗口)，False=弹出可视化浏览器
    impersonate: str = ""       # 浏览器指纹伪装，填Chrome/Edge版本，规避网站指纹风控


#点击网页元素后，自动生成稳定的选择器
class ResolveSelectorRequest(BaseModel):
    page_id: str
    tag: str = ""
    element_id: str = ""
    classes: list[str] = []
    attributes: dict[str, str] = {}
    browser_xpath: str = ""
    browser_css: str = ""

#拿着生成好的选择器，批量爬整页全部列表数据
class ScrapeRequest(BaseModel):
    page_id: str
    fields: list[dict] = []
    container_selector: str = ""

#图区完的数据导出文件
class ExportRequest(BaseModel):
    rows: list[dict] = []
    fields: list[str] = []
    format: str = "json"  # json, csv, xlsx

#-------FastAPI application------
HERE=Path(__file__).parent # 获取当前文件所属的文件夹
FRONTEND_DIR=HERE/"frontend" # 前端静态文件目录
PAGE_STORE:dict[str,bytes]={}#将抓取的html的页面转换为二进制存储到内存缓冲中    
PAGE_META:dict[str,dict]={} #就是个简单的字典，存储页面ID和对应的元信息（URL、抓取时间等），方便后续查询和管理

app=FastAPI(title="智能招聘助手",description="辅助生成稳定选择器,批量爬取BOSS简历数据，导出结构化文件",version="1.0")
#1、挂载静态文件目录
if FRONTEND_DIR.is_dir():
    app.mount("/static", StaticFiles(directory=str(FRONTEND_DIR)), name="static")

#----API Routes------
#也就是说有个执行async函数的时候 这个函数不会执行 会一直阻塞 直到cpu轮到他了才会去执行。然后await是等待async执行好的结果去拿到
@app.get("/api/health")
async def health():
    return {"status":"ok","message":"智能招聘助手API运行正常"}

@app.get("/")
async def index():
    """Serve the main application UI."""
    index_path = FRONTEND_DIR / "index.html"
    if not index_path.exists():
        return HTMLResponse("<h1>Frontend not built</h1>", status_code=200)
    return HTMLResponse(index_path.read_text(encoding="utf-8"))

@app.post("/api/fetch")
async def fetch_page(req:FetchRequest):
    """Fetch the target URL and store the HTML content in memory."""
    from scrapling.

    # 这里应该调用爬虫模块，传入req参数，执行爬取逻辑，拿到HTML内容
    # 伪代码：
    # html_content = await crawl_page(req.url, fetcher_type=req.fetcher_type, ...)
    # page_id = generate_unique_id()
    # PAGE_STORE[page_id] = html_content.encode("utf-8") # 存储为二进制
    # PAGE_META[page_id] = {"url": req.url, "fetched_at": datetime.now(), ...}
    # return {"page_id": page_id, "message": "页面抓取成功"}
    return {"page_id": "dummy_page_id", "message": "页面抓取成功（示例响应）"}
