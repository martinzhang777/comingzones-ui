interface Ref<T> {
  value: T;
}

interface ComputedRef<T> {
  value: T;
}

declare namespace APP {
  interface Code {
    code: string;
    name: string;
  }

  type CodeMap = Record<string, Code[]>;

  interface AppState {
    connectionType: string;
    inApp: boolean;
    version: string;
    versionCode: string;
    language: string;
    routeLinks: string[];
    platform: "Android" | "IOS";
    inWechat: boolean;
    codes: CodeMap;
    productInsuranceCompanyList: API.InsuranceCompanyGroup[];
    productRiskNavigation: API.ProductNavigation[];
    orderRiskNavigationList: API.ProductNavigation[];
    orderInsuranceCompanyList: API.InsuranceCompanyGroup[];
    advertisement: API.Advertisement;
    carefullyChosenProducts: API.CarefullyChosenProducts;

    /**
     *
     * 微信JSSDK准备状态
     * @type {boolean}
     * @memberof AppState
     */
    weChatJSSDKReady: boolean;

    /**
     *
     * 微信授权状态
     * @type {boolean}
     * @memberof AppState
     */
    weChatAuth: boolean;

    /**
     *
     * 是否生产环境
     * @type {boolean}
     * @memberof AppState
     */
    isProduction: boolean;

    /**
     *
     * 设备信息
     * @type {DeviceInfo}
     * @memberof AppState
     */
    device: DeviceInfo;

    /**
     *
     * 当前应用的包名
     * @type {string}
     * @memberof AppState
     */
    appPackageName: string;

    /**
     *
     * 当前应用的名称
     * @type {string}
     * @memberof AppState
     */
    appName: string;
    // 是否安装了微信
    isInstallWeChat: boolean;
  }

  interface DeviceInfo {
    available?: boolean;
    cordova?: string;
    isVirtual?: boolean;
    manufacturer?: string;
    model?: string;
    platform?: string;
    serial?: string;
    uuid?: string;
    version?: string;
  }
  interface RedirectConfig {
    name: string;
    query: any;
  }
  interface BlessingsState {
    refreshTask: boolean;
  }
  interface UserState {
    user: API.UserInfo;
    token: string;
    redirect: RedirectConfig;
    weChatInfo: API.WechatInfoRecsult;
  }

  interface DataState {
    /**
     *
     * 培训文章
     * @type {string[]}
     * @memberof DataState
     */
    courseSectionList: string[];

    /**
     *
     * 试题列表
     * @type {DATA.ExamTopic[]}
     * @memberof DataState
     */
    examPaperList: DATA.ExamTopic[];

    /**
     *
     * 推送的消息体
     * @type {*}
     * @memberof DataState
     */
    messageDetail: Record<string, any>;

    /**
     *
     * 未读消息数量
     * @type {number}
     * @memberof DataState
     */
    messageCount: number;
  }
  interface SpeechParams {
    appKey: string;
    token: string;
  }
  interface selectItemsParams {
    productComparisonPOList: any;
  }
  interface NativeState {
    speech: SpeechParams;
  }

  interface ProductCompareState {
    selectItems: selectItemsParams;
    selectItemKeys: Array;
    isAddFlag: any;
  }
  interface State {
    app: AppState;
    user: UserState;
    blessings: BlessingsState;
    productCompare: ProductCompareState;
    product: ApiProduct;
    native: NativeState;
    data: DataState;
  }

  interface ApiProduct {
    product: ProductState;
  }

  interface ProductState {
    productDetail: API.ProductApiPageResult;
    calculatePremium: any;
    insuredProtocol: API.InsuredProtocolResult;
    healthInform: API.HealthNotificationResult;
    createOrderInfo: API.CreateApiOrderResult;
    confirmOrderInfo: API.ConfirmOrderInfo;
  }
  interface ConfirmOrderInfo {
    orderNo: string;
    orderStatus: string;
    orderStatusName: string;
    sumPremium: string;
    orderCreateTime: string;
    orderModifyTime: string;
    productInfos: ProductInfo[];
    applicantInfos: ApplicantInfo[];
    insuredInfos: InsuredInfo[];
    beneficiaryInfos: BeneficiaryInfo[];
  }

  interface BeneficiaryInfo {
    beneficiaryType: string;
  }

  interface InsuredInfo {
    insuredName: string;
    insuredSex: string;
    insuredBirthday: string;
    insuredEmail: string;
    insuredCardType: string;
    insuredCardTypeName: string;
    insuredCardNo: string;
    insuredArea1: string;
    insuredArea2: string;
    insuredArea3: string;
    insuredContactAddress: string;
    insuredJobOccupation1: string;
    insuredJobOccupation2: string;
    insuredJobOccupation3: string;
    insuredPhone: string;
    insuredInsuranceRelationship: string;
    insuredProvinceName: string;
    insuredCityName: string;
    insuredCountyName: string;
    insuredJobOccupationName1: string;
    insuredJobOccupationName2: string;
    insuredJobOccupationName3: string;
  }

  interface ApplicantInfo {
    applicantName: string;
    applicantSex: string;
    applicantBirthday: string;
    applicantEmail: string;
    applicantCardType: string;
    applicantCardTypeName: string;
    applicantCardNo: string;
    applicantArea1: string;
    applicantArea2: string;
    applicantArea3: string;
    applicantContactAddress: string;
    applicantJobOccupation1: string;
    applicantJobOccupation2: string;
    applicantJobOccupation3: string;
    applicantPhone: string;
    applicantProvinceName: string;
    applicantCityName: string;
    applicantCountyName: string;
    applicantJobOccupationName1: string;
    applicantJobOccupationName2: string;
    applicantJobOccupationName3: string;
    bankCardHolderName: string;
    bankName: string;
    bankAccountNo: string;
    bankReservedMobileNumber: string;
  }

  interface ProductInfo {
    productName: string;
    productId: string;
    insurePeriod: string;
    paymentPeriod: string;
    premium: string;
    isMain: string;
    insuredAmount: string;
  }
  interface RefreshOptions {
    /**
     *
     * 是否显示下拉刷新信息
     * @type {boolean}
     * @memberof RefreshOptions
     */
    refresh?: boolean;

    /**
     *
     * 是否清空当前数组
     * @type {boolean}
     * @memberof RefreshOptions
     */
    empty?: boolean;
  }
  interface ListResult<T> {
    pageNo: Ref<number>;
    items: T[];
    pageSize: Ref<number>;
    refreshing: Ref<boolean>;
    onRefresh: (options?: RefreshOptions) => void;
    onLoad: () => void;
    offset: Ref<number>;
    finished: Ref<boolean>;
    error: Ref<boolean>;
    loading: Ref<boolean>;
    filterItems?: T[];
  }

  interface Pagination<T> {
    total: number;
    rows: T[];
  }
  interface PaginationParams {
    pageNo: number;
    pageSize: number;
    offset: number;
  }

  type ListSource<T> = (
    params: APP.PaginationParams
  ) => Promise<APP.Pagination<T>>;
  interface ListProps {
    renderItem?: (data: T) => void;
  }
  interface HistoryResult {
    list: string[];
    add: (value: string) => void;
    clear: () => void;
    remove: (value: string) => void;
  }
  type Callback = () => void;
  interface Search {
    isFocus: Ref<boolean>;
    keyword: Ref<string>;
    blur: () => void;
    focus: () => void;
    search: (Callback, any) => void;
  }
  interface CodeHookProps {
    verifySuccess?: () => void;
    duration?: number;

    /**
     *
     * 1通过手机号获取验证码 2通过token获取验证码
     * @type {("1" | "2")}
     * @memberof CodeHookProps
     */
    getType?: "1" | "2";

    /**
     *
     * 自定义的请求验证码的接口
     * @memberof CodeHookProps
     */
    request?: (phone: string) => Promise<void>;
  }
  interface CodeHook {
    /**
     *
     * 手机号
     * @type {(Ref<string | null>)}
     * @memberof CodeHook
     */
    phone: Ref<string | null>;

    /**
     *
     * 验证码
     * @type {Ref<string>}
     * @memberof CodeHook
     */
    phoneCode: Ref<string>;

    /**
     *
     * 倒计时
     * @type {Ref<number>}
     * @memberof CodeHook
     */
    countdown: Ref<number>;

    /**
     *
     * 获取验证码
     * @memberof CodeHook
     */
    getCode: (phone?: string) => Promise<any>;

    /**
     *
     * 验证验证码
     * @memberof CodeHook
     */
    verifyCode: (params: APP.VerifyCode) => Promise<any>;

    /**
     *
     * 整体loading
     * @type {Ref<boolean>}
     * @memberof CodeHook
     */
    codeLoading: Ref<boolean>;

    /**
     *
     * 获取验证码的loading
     * @type {Ref<boolean>}
     * @memberof CodeHook
     */
    loadingForGetCode: Ref<boolean>;

    /**
     *
     * 验证验证码的loading
     * @type {Ref<boolean>}
     * @memberof CodeHook
     */
    loadingForVerifyCode: Ref<boolean>;
  }
  interface VerifyCode {
    phone: string;
    phoneCode: string;
  }

  interface CameraHookProps {
    onError?: (e: Error) => void;
    onSuccess?: (uri: string) => void;
    width?: number;
  }
  interface CameraHook {
    fileUri: Ref<string>;
    filePath: Ref<string | null>;
    loading: Ref<boolean>;
    getPicture: (options: NATIVE.CameraOptions) => Promise<any>;

    /**
     *
     * 上传文件
     * @memberof CameraHook
     */
    upload: (data?: string, format?: "png" | "jpg") => Promise<string>;
    getFormData: (data: string) => Promise<FormData>;
  }
  interface InsuredHook {
    insuredInfo: Ref<Insured>;
    setProps: (props: InsuredData) => void;
  }

  interface Insured {
    routeName: string;
    induredBtnText: string;
    insuredType: string;
    agentCode?: string;
  }
  interface Product {
    jumpFlag: string;
    accreditFlag: string;
  }
  interface ShareInfo {
    shareUserType: string;
  }
  interface InsuredData {
    product: Product;
    shareInfo: ShareInfo;
  }

  // 定位相关
  /**
   *
   * 通过逆地理编码接口解析出来的地址信息
   * @interface LocationDetail
   */
  interface LocationDetail {
    addressComponent?: AddressComponent;
    formatted_address?: string;
  }

  interface AddressComponent {
    city: any[];
    province: string;
    adcode: string;
    district: string;
    towncode: string;
    streetNumber: StreetNumber;
    country: string;
    township: string;
    businessAreas: any[][];
    building: Building;
    neighborhood: Building;
    citycode: string;
  }

  interface Building {
    name: string;
    type: string;
  }

  interface StreetNumber {
    number: string;
    location: string;
    direction: string;
    distance: string;
    street: string;
  }
  interface LocationInfo {
    AOIName?: string;
    POIName?: string;
    accuracy?: number;
    adcode?: string;
    city?: string;
    citycode?: string;
    country?: string;
    district?: string;
    formattedAddress?: string;
    latitude?: number;
    longitude?: number;
    number?: string;
    province?: string;
    street?: string;
  }
  interface LocationHookProps {
    onError?: (e: Error) => void;
    onSuccess?: (location: LocationInfo) => void;
    onCancel?: () => void;
    onBefore?: () => void;
    onAfter?: () => void;
  }
  interface LocationHook {
    loading: Ref<boolean>;
    noAuthorize: ComputedRef<boolean>;
    error: Ref<Error | undefined>;
    location: Ref<LocationInfo | undefined>;
    getLocation: () => Promise<any>;
    openLocationSetting: () => void;
  }

  interface SpeechOptions {
    appKey: string;
    token: string;
    params: any;
  }

  interface SpeechHookProps {
    onVolume?: (number) => void;
    onError?: (e: Error) => void;
    onSuccess?: (location: LocationInfo) => void;
    volLength?: number;
  }
  interface SpeechResult {
    realtime: string;
    final: string;
  }

  interface SpeechHook {
    loading: Ref<boolean>;
    error: Ref<string | null>;
    noAuthorize: ComputedRef<boolean>;
    /**
     *
     * 能量值列表 能量值在 0 到 -160 之间
     * @type {number[]}
     * @memberof SpeechHook
     */
    rms: number[];
    result: SpeechResult;

    startDialog: () => Promise<any>;
    stopDialog: () => void;
    openSetting: () => void;
  }

  interface ScannerHook {
    loading: Ref<boolean>;
    noAuthorize: Ref<boolean>;
    error: Ref<string | null>;
    text: Ref<string>;
    scan: (selector: string) => Promise<any>;
    destroy: () => void;
  }
  interface ScannerHookProps {
    onError?: (e: Error) => void;
    onSuccess?: (text: string) => void;
  }

  interface WeChatHookProps {
    onError?: (e: Error) => void;
    onSuccess?: () => void;
  }

  interface WeChatShareOptions {
    /**
     *
     * 0 微信 1 朋友圈
     * @type {(0 | 1)}
     * @memberof WeChatShareOptions
     */
    scene: 0 | 1;
    content: WeChatShareContent;
  }
  interface WeChatShareContent {
    title: string;
    description: string;
    thumb: string;
    url: string;
  }

  interface WeChatHook {
    loading: Ref<boolean>;
    error: Ref<Error | undefined>;
    configJSSDK: () => Promise<void | null>;
    checkJSSDK: () => Promise<void | null>;
    share: (options: WeChatShareOptions) => Promise<any>;
  }
  interface VerifyResult {
    certifyId: string;
    certifyUrl?: string;
  }

  interface VerifyHookProps {
    onError?: (e: Error) => void;
    onSuccess?: (data: VerifyResult) => void;
  }
  interface VerifyHook {
    loading: Ref<boolean>;
    data: Ref<VerifyResult | undefined>;
    error: Ref<Error | undefined>;
    verify: (params?: API.AuthenticationParams) => Promise<VerifyResult | null>;
    startVerify: (params?: API.AuthenticationParams) => Promise<VerifyResult>;
  }
  interface SignatureHookProps {
    /**
     *
     * 发生了错误
     * @memberof SignatureHookProps
     */
    onError?: (e: Error) => void;

    /**
     *
     * 签名成功
     * @memberof SignatureHookProps
     */
    onSuccess?: () => void;

    /**
     *
     * 签名完成等待查询结果
     * @memberof SignatureHookProps
     */
    onWill?: () => void;

    /**
     *
     * 取消签名
     * @memberof SignatureHookProps
     */
    onCancel?: () => void;
    onBefore?: () => void;
    onAfter?: () => void;

    /**
     *
     * 获取签名地址的方法
     * @memberof SignatureHookProps
     */
    getSignUrl?: () => Promise<API.GetSignUrlResult>;
  }
  interface SignatureHook {
    loading: Ref<boolean>;
    data: any;
    error: Ref<Error | undefined>;

    result: API.GetSignUrlResult;

    /**
     *
     * 开始签名
     * @memberof SignatureHook
     */
    startSignature: () => Promise<any>;

    /**
     *
     * 获取APP回调的地址
     * @memberof SignatureHook
     */
    getAppSchema: () => string;
  }

  interface OCRHookProps {
    onError?: (e: Error) => void;
    onSuccess?: (data: API.OCRBackResult & API.OCRFaceResult) => void;
  }
  interface OCRHook {
    loading: ComputedRef<boolean>;
    data: Ref<(API.OCRBackResult & API.OCRFaceResult) | undefined>;
    error: Ref<Error | undefined>;
    startOCR: (options?: any) => Promise<any>;
  }

  interface SaveImgToGalleryHookProps {
    onError?: (e: Error) => void;
    onSuccess?: () => void;
  }
  interface SaveImgToGalleryHook {
    loading: ComputedRef<boolean>;
    error: Ref<Error | undefined>;
    saveImgToGallery: (url: string) => void;
  }

  interface AppleLogin {
    email: string;
    authorizationCode: string;
    state: string;
    identityToken: string;
    fullName: FullName;
    user: string;
  }

  interface FullName {
    nickname: string;
    // phoneticRepresentation: PhoneticRepresentation;
    middleName: string;
    familyName: string;
    namePrefix: string;
    givenName: string;
    nameSuffix: string;
  }

  // interface PhoneticRepresentation {}
}
