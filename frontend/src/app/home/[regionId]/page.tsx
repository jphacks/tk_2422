export default function RegionPage({ params }: { params: { regionId: string } }) {
  return (
    <div>
      <h1>{params.regionId}のページ</h1>
      <p>ここには{params.regionId}に関する情報が表示されます。</p>
    </div>
  );
}