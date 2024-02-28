using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    //Request
    public class DataSourceLoadOptions
    {
        public DataSourceLoadOptions()
        {

        }

        public SortingInfo[] Sort { get; set; }
        public int Take { get; set; }
        public int Skip { get; set; }
        private bool IsSort
        {
            get => !(Sort == null || Sort.Length == 0);
        }

        public string SortBy
        {
            get => IsSort ? Sort.First().Selector : null;
        }

        public string SortDirection
        {
            get => IsSort ? Sort.First().Desc ? "DESC" : "ASC" : null;
        }

    }

    public class SortingInfo
    {
        public bool Desc { get; set; }
        public string Selector { get; set; }
    }

    //Response
    public interface ILoadResult
    {
        int? TotalCount { get; set; }
    }

    public class LoadResult
    {
        public LoadResult()
        {

        }

        //
        // Summary:
        //     A resulting dataset.
        public IEnumerable data { get; set; }
        public IEnumerable details { get; set; }
        //
        // Summary:
        //     The total number of data objects in the resulting dataset.
        [DefaultValue(-1)]
        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int? totalCount { get; set; }
        //
        // Summary:
        //     The number of top-level groups in the resulting dataset.
        [DefaultValue(-1)]
        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int groupCount { get; set; }
        //
        // Summary:
        //     Total summary calculation results.
        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public object[] summary { get; set; }
    }

    public static class LoadResultExtension
    {
        //Using This Extension
        //Exanoke Interface Function (IService)
        //Task<LoadResult> Query________(Query__________Param param);

        //Example Implement Function  (Service)
        //public async Task<LoadResult> Query________(Query__________Param param)
        //{
        //    return (await _context.Procedures.USP_Query__________Async(
        //        ImportCustomerSaleOwnerId: param.RawMaterialRequestId,
        //        PageNo: param.LoadOptions.PageNo,
        //        Take: param.LoadOptions.Take,
        //        SortDirection: param.LoadOptions.SortDirection,
        //        SortBy: param.LoadOptions.SortBy)).LoadResult();
        //}

        //public class Query__________Param {
        //    public ? YourCriteriasearch { get; set; }
        //    public DataSourceLoadOptions LoadOptions { get; set; }
        //}

        public static LoadResult LoadResult<T>(this List<T> list) where T : ILoadResult
        {
            var result = new LoadResult();
            result.totalCount = list.Count > 0 ? list.First().TotalCount.Value : 0;
            result.data = list;
            return result;
        }
    }
}