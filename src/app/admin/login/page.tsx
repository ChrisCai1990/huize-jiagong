import { login } from "@/app/actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm px-4">
        <div className="text-center mb-10">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "var(--green-700)" }}
          >
            <span className="text-white text-xl font-bold">汇</span>
          </div>
          <h1 className="text-xl font-semibold" style={{ color: "var(--green-900)" }}>汇泽内容工厂</h1>
          <p className="text-sm text-gray-500 mt-1">内容管理后台</p>
        </div>

        <div className="bg-white rounded-xl p-6" style={{ border: "1px solid var(--green-100)", boxShadow: "0 1px 8px 0 rgba(64,145,108,0.06)" }}>
          <form action={login} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">管理密码</label>
              <input
                type="password"
                name="password"
                required
                autoFocus
                placeholder="请输入密码"
                className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors"
                style={{ border: "1px solid var(--green-200)", "--tw-ring-color": "var(--green-400)" } as React.CSSProperties}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--green-400)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--green-200)")}
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                密码错误，请重试
              </p>
            )}
            <button
              type="submit"
              className="w-full text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ background: "var(--green-700)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--green-800)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--green-700)")}
            >
              进入后台
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
